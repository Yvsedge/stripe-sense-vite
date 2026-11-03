import express from 'express';
import multer from 'multer';
import { ObjectId } from 'mongodb';
import { randomUUID } from 'node:crypto';
import { authentication } from './auth.js';
import { analyze, demoProfile, validateProfile } from './analyzer.js';

const text = (value, max = 100) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';
const id = (value) => (/^[a-f\d]{24}$/i.test(value) ? new ObjectId(value) : null);
export function createApp(db) {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '100kb' }));
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 8 * 1024 * 1024, files: 1, fields: 4, fieldSize: 100000 },
    fileFilter: (_req, file, cb) =>
      cb(null, ['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)),
  });
  app.get('/api/health', async (_req, res) => {
    await db.command({ ping: 1 });
    res.json({ status: 'ok', database: db.databaseName });
  });
  app.use('/api', authentication(db));
  app.get('/api/reference-example', (_req, res) => res.json(demoProfile));
  app.get('/api/patients', async (req, res) =>
    res.json(
      await db
        .collection('patients')
        .find({ ownerId: req.user._id })
        .sort({ createdAt: -1 })
        .limit(500)
        .toArray(),
    ),
  );
  app.post('/api/patients', async (req, res) => {
    const name = text(req.body.name),
      patientCode =
        text(req.body.patientCode, 40) || `P-${randomUUID().slice(0, 8).toUpperCase()}`;
    if (!name || !patientCode)
      return res.status(400).json({ error: 'Patient name and patient ID are required.' });
    const patient = { ownerId: req.user._id, name, patientCode, createdAt: new Date() };
    try {
      const result = await db.collection('patients').insertOne(patient);
      res.status(201).json({ ...patient, _id: result.insertedId });
    } catch (err) {
      if (err.code === 11000)
        return res.status(409).json({ error: 'That patient ID already exists.' });
      throw err;
    }
  });
  app.get('/api/tests', async (req, res) => {
    const filter = { ownerId: req.user._id };
    if (req.query.patientId) {
      if (!id(req.query.patientId))
        return res.status(400).json({ error: 'Invalid patient ID.' });
      filter.patientId = id(req.query.patientId);
    }
    res.json(
      await db
        .collection('tests')
        .find(filter, { projection: { image: 0, referenceProfile: 0 } })
        .sort({ createdAt: -1 })
        .limit(500)
        .toArray(),
    );
  });
  app.get('/api/tests/:id', async (req, res) => {
    const test =
      id(req.params.id) &&
      (await db
        .collection('tests')
        .findOne(
          { _id: id(req.params.id), ownerId: req.user._id },
          { projection: { image: 0 } },
        ));
    if (!test) return res.status(404).json({ error: 'Test not found.' });
    res.json(test);
  });
  app.get('/api/tests/:id/image', async (req, res) => {
    const test =
      id(req.params.id) &&
      (await db
        .collection('tests')
        .findOne(
          { _id: id(req.params.id), ownerId: req.user._id },
          { projection: { image: 1 } },
        ));
    if (!test) return res.status(404).json({ error: 'Image not found.' });
    res.set('Cache-Control', 'no-store').type('png').send(Buffer.from(test.image.buffer));
  });
  app.post('/api/tests', upload.single('image'), async (req, res) => {
    if (!req.file)
      return res
        .status(400)
        .json({ error: 'Upload one JPEG, PNG or WebP image (maximum 8 MB).' });
    const patient =
      id(req.body.patientId) &&
      (await db
        .collection('patients')
        .findOne({ _id: id(req.body.patientId), ownerId: req.user._id }));
    if (!patient) return res.status(400).json({ error: 'Select an existing patient.' });
    let profile, crop, result;
    try {
      profile = validateProfile(JSON.parse(req.body.profile));
      crop = JSON.parse(req.body.crop);
      result = await analyze(req.file.buffer, profile, crop);
    } catch (err) {
      return res.status(422).json({ error: err.message });
    }
    if (result.normalized.length > 10 * 1024 * 1024)
      return res.status(422).json({
        error: 'Decoded image is too large. Resize the photo before uploading.',
      });
    const test = {
      ownerId: req.user._id,
      patientId: patient._id,
      patientName: patient.name,
      patientCode: patient.patientCode,
      createdAt: new Date(),
      profileName: profile.name,
      synthetic: profile.synthetic === true,
      method: 'CIELAB nearest reference (Delta E 1976)',
      parameters: result.parameters,
      crop,
      referenceProfile: profile,
      image: result.normalized,
    };
    const saved = await db.collection('tests').insertOne(test);
    const { image, referenceProfile, ...response } = test;
    res.status(201).json({ ...response, _id: saved.insertedId });
  });
  app.delete('/api/tests/:id', async (req, res) => {
    const result =
      id(req.params.id) &&
      (await db
        .collection('tests')
        .deleteOne({ _id: id(req.params.id), ownerId: req.user._id }));
    if (!result?.deletedCount) return res.status(404).json({ error: 'Test not found.' });
    res.status(204).end();
  });
  app.use('/api', (_req, res) => res.status(404).json({ error: 'API route not found.' }));
  app.use((err, _req, res, _next) => {
    console.error(err.message);
    res.status(err instanceof multer.MulterError || err.status === 400 ? 400 : 500).json({
      error:
        err instanceof multer.MulterError
          ? 'Upload rejected: ' + err.message
          : err.status === 400
            ? 'Invalid request body.'
            : 'The server could not complete the request.',
    });
  });
  return app;
}
