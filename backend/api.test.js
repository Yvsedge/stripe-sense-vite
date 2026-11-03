import test from 'node:test';
import assert from 'node:assert/strict';
import { MongoClient } from 'mongodb';
import sharp from 'sharp';
import { createApp } from './app.js';
import { demoProfile } from './analyzer.js';

test(
  'MongoDB: patient, upload, history, report, image, deletion',
  { skip: !process.env.TEST_MONGODB_URI },
  async () => {
    const client = new MongoClient(process.env.TEST_MONGODB_URI);
    await client.connect();
    const db = client.db(`stripesense_test_${Date.now()}`);
    const server = createApp(db).listen(0, '127.0.0.1');
    await new Promise((resolve) => server.once('listening', resolve));
    const base = `http://127.0.0.1:${server.address().port}/api`;
    let cookie = '';
    const fetch = (url, options = {}) =>
      globalThis.fetch(url, {
        ...options,
        headers: { ...options.headers, Cookie: cookie },
      });
    const credentials = {
      name: 'Demo Doctor',
      email: 'doctor@example.test',
      password: 'test-password-123',
      role: 'doctor',
    };
    const jsonPost = (body) => ({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    try {
      await db
        .collection('patients')
        .createIndex({ ownerId: 1, patientCode: 1 }, { unique: true });
      await db.collection('users').createIndex({ email: 1 }, { unique: true });
      assert.equal((await fetch(base + '/patients')).status, 401);
      assert.equal((await fetch(base + '/tests')).status, 401);
      const registration = await fetch(base + '/auth/register', jsonPost(credentials));
      assert.equal(registration.status, 201);
      cookie = registration.headers.get('set-cookie').split(';')[0];
      assert.match(registration.headers.get('set-cookie'), /HttpOnly/i);
      assert.match(registration.headers.get('set-cookie'), /SameSite=Strict/i);
      assert.equal((await (await fetch(base + '/auth/me')).json()).user.role, 'doctor');
      assert.equal(
        (await fetch(base + '/auth/register', jsonPost(credentials))).status,
        409,
      );
      assert.equal(
        (
          await fetch(
            base + '/auth/login',
            jsonPost({ ...credentials, password: 'incorrect-password' }),
          )
        ).status,
        401,
      );
      const storedUser = await db
        .collection('users')
        .findOne({ email: credentials.email });
      assert.notEqual(storedUser.passwordHash, credentials.password);
      const body = JSON.stringify({ name: 'Demo', patientCode: 'TEST-1' });
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      };
      const response = await fetch(base + '/patients', options);
      assert.equal(response.status, 201);
      const patient = await response.json();
      assert.equal((await fetch(base + '/patients', options)).status, 409);
      const image = await sharp({
        create: { width: 1000, height: 100, channels: 3, background: '#d7cd82' },
      })
        .png()
        .toBuffer();
      const form = new FormData();
      form.append('image', new Blob([image], { type: 'image/png' }), 'strip.png');
      form.append('patientId', patient._id);
      form.append('profile', JSON.stringify(demoProfile));
      form.append('crop', JSON.stringify({ x: 0, y: 0, width: 1, height: 1 }));
      const upload = await fetch(base + '/tests', { method: 'POST', body: form });
      assert.equal(upload.status, 201);
      const result = await upload.json();
      assert.equal(result.parameters.length, 10);
      assert.equal(result.image, undefined);
      assert.equal(
        (await (await fetch(base + '/tests?patientId=' + patient._id)).json()).length,
        1,
      );
      const photo = await fetch(base + `/tests/${result._id}/image`);
      assert.equal(photo.status, 200);
      assert.ok((await photo.arrayBuffer()).byteLength > 0);
      assert.equal((await fetch(base + `/tests/${result._id}`)).status, 200);
      const ownerCookie = cookie;
      const second = await fetch(
        base + '/auth/register',
        jsonPost({
          ...credentials,
          email: 'individual@example.test',
          role: 'individual',
        }),
      );
      assert.equal(second.status, 201);
      cookie = second.headers.get('set-cookie').split(';')[0];
      assert.equal((await (await fetch(base + '/patients')).json()).length, 0);
      assert.equal((await (await fetch(base + '/tests')).json()).length, 0);
      assert.equal((await fetch(base + `/tests/${result._id}`)).status, 404);
      assert.equal((await fetch(base + `/tests/${result._id}/image`)).status, 404);
      assert.equal(
        (await fetch(base + `/tests/${result._id}`, { method: 'DELETE' })).status,
        404,
      );
      assert.equal(
        (await fetch(base + '/tests', { method: 'POST', body: form })).status,
        400,
      );
      assert.equal(
        (
          await fetch(
            base + '/patients',
            jsonPost({ name: 'Self', patientCode: 'TEST-1' }),
          )
        ).status,
        201,
      );
      const generatedPatient = await (
        await fetch(base + '/patients', jsonPost({ name: 'Family member' }))
      ).json();
      assert.match(generatedPatient.patientCode, /^P-/);
      cookie = ownerCookie;
      assert.equal((await fetch(base + '/tests?patientId=bad')).status, 400);
      assert.equal((await fetch(base + '/tests', { method: 'POST' })).status, 400);
      assert.equal(
        (await fetch(base + `/tests/${result._id}`, { method: 'DELETE' })).status,
        204,
      );
      assert.equal((await fetch(base + `/tests/${result._id}`)).status, 404);
      assert.equal((await fetch(base + '/auth/logout', { method: 'POST' })).status, 204);
      assert.equal((await fetch(base + '/auth/me')).status, 401);
      assert.equal((await fetch(base + '/patients')).status, 401);
      const login = await fetch(base + '/auth/login', jsonPost(credentials));
      assert.equal(login.status, 200);
      cookie = login.headers.get('set-cookie').split(';')[0];
      assert.equal((await fetch(base + '/auth/me')).status, 200);
      await fetch(base + '/auth/logout', { method: 'POST' });
      assert.equal(
        (
          await fetch(base + '/patients', {
            ...jsonPost({ name: 'CSRF' }),
            headers: {
              'Content-Type': 'application/json',
              Origin: 'https://untrusted.example',
            },
          })
        ).status,
        403,
      );
    } finally {
      await new Promise((resolve) => server.close(resolve));
      await db.dropDatabase();
      await client.close();
    }
  },
);
