import {
  randomBytes,
  scrypt as scryptCallback,
  timingSafeEqual,
  createHash,
} from 'node:crypto';
import { promisify } from 'node:util';
import { Router } from 'express';

const scrypt = promisify(scryptCallback);
const digest = (value) => createHash('sha256').update(value).digest('hex');
const publicUser = (user) => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  role: user.role,
});
const cookieOptions = {
  httpOnly: true,
  sameSite: 'strict',
  secure: process.env.NODE_ENV === 'production',
  path: '/',
};

export function authentication(db) {
  const router = Router();
  const attempts = new Map();
  router.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    if (
      req.method !== 'GET' &&
      req.headers.origin &&
      !['http://localhost:5173', 'http://127.0.0.1:5173', process.env.APP_ORIGIN]
        .filter(Boolean)
        .includes(req.headers.origin)
    )
      return res.status(403).json({ error: 'Request origin is not allowed.' });
    next();
  });
  router.use(async (req, _res, next) => {
    const token = req.headers.cookie
      ?.split(';')
      .map((v) => v.trim())
      .find((v) => v.startsWith('stripesense_session='))
      ?.slice('stripesense_session='.length);
    if (token && /^[a-f0-9]{64}$/.test(token)) {
      const session = await db
        .collection('sessions')
        .findOne({ tokenHash: digest(token), expiresAt: { $gt: new Date() } });
      if (session)
        req.user = await db.collection('users').findOne({ _id: session.userId });
      req.sessionHash = digest(token);
    }
    next();
  });
  async function sessionFor(user, res) {
    const token = randomBytes(32).toString('hex');
    await db.collection('sessions').insertOne({
      tokenHash: digest(token),
      userId: user._id,
      expiresAt: new Date(Date.now() + 7 * 86400000),
    });
    res.cookie('stripesense_session', token, { ...cookieOptions, maxAge: 7 * 86400000 });
    return publicUser(user);
  }
  router.post(['/auth/register', '/auth/login'], async (req, res) => {
    const now = Date.now();
    for (const [key, value] of attempts) if (value.until < now) attempts.delete(key);
    const key = req.ip;
    const attempt = attempts.get(key) || { count: 0, until: now + 15 * 60000 };
    if (attempt.count >= 30 || attempts.size > 10000)
      return res
        .status(429)
        .json({ error: 'Too many attempts. Try again in 15 minutes.' });
    attempt.count++;
    attempts.set(key, attempt);
    const { name, password, role } = req.body || {};
    const email =
      typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      email.length > 254 ||
      typeof password !== 'string' ||
      password.length < 8 ||
      password.length > 128
    )
      return res
        .status(400)
        .json({ error: 'Enter a valid email and a password of 8–128 characters.' });
    if (req.path === '/auth/register') {
      if (
        typeof name !== 'string' ||
        !name.trim() ||
        name.length > 100 ||
        !['doctor', 'individual'].includes(role)
      )
        return res
          .status(400)
          .json({ error: 'Enter your name and choose an account type.' });
      const salt = randomBytes(16).toString('hex');
      const hash = (await scrypt(password, salt, 64)).toString('hex');
      const user = {
        name: name.trim(),
        email,
        role,
        salt,
        passwordHash: hash,
        createdAt: new Date(),
      };
      try {
        const inserted = await db.collection('users').insertOne(user);
        user._id = inserted.insertedId;
      } catch (error) {
        if (error.code === 11000)
          return res
            .status(409)
            .json({ error: 'An account with this email already exists.' });
        throw error;
      }
      return res.status(201).json({ user: await sessionFor(user, res) });
    }
    const user = await db.collection('users').findOne({ email });
    const hash = await scrypt(password, user?.salt || 'invalid-account-timing-salt', 64);
    if (!user || !timingSafeEqual(hash, Buffer.from(user.passwordHash, 'hex')))
      return res.status(401).json({ error: 'Email or password is incorrect.' });
    res.json({ user: await sessionFor(user, res) });
  });
  router.get('/auth/me', (req, res) =>
    res
      .status(req.user ? 200 : 401)
      .json(req.user ? { user: publicUser(req.user) } : { error: 'Please sign in.' }),
  );
  router.post('/auth/logout', async (req, res) => {
    if (req.sessionHash)
      await db.collection('sessions').deleteOne({ tokenHash: req.sessionHash });
    res.clearCookie('stripesense_session', cookieOptions).status(204).end();
  });
  router.use((req, res, next) =>
    req.user
      ? next()
      : res.status(401).json({ error: 'Please sign in to access your workspace.' }),
  );
  return router;
}
