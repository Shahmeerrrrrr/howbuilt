import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { db } from './lib/db.js';
import { analyzeWebsite } from './engine/analyzer.js';
import { FAMOUS_PRESETS } from './presets/famousSites.js';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'howbuilt_default_jwt_secret_key';

app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());

// JWT Auth Verification Middleware
const authGuard = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
  }
};

// Health Check (public)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), service: 'HowBuilt Analyzer API' });
});

// Presets list (public)
app.get('/api/presets', (req, res) => {
  const presetsList = Object.keys(FAMOUS_PRESETS).map(domain => ({
    domain,
    url: FAMOUS_PRESETS[domain].url,
    archetype: FAMOUS_PRESETS[domain].aiAnalysis.archetype,
    topTechs: Object.values(FAMOUS_PRESETS[domain].categories)
      .flatMap(c => c.techs)
      .slice(0, 4)
      .map(t => t.name)
  }));
  res.json({ presets: presetsList });
});

// ── Auth Endpoints ──

// SIGNUP
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password || password.length < 6) {
    return res.status(400).json({ error: 'Valid email and password (min 6 chars) required.' });
  }

  const normalizedEmail = email.trim().toLowerCase();

  try {
    // Check if user exists
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(normalizedEmail);
    if (existing) {
      return res.status(400).json({ error: 'An account with this email already exists.' });
    }

    const id = uuidv4();
    const passwordHash = await bcrypt.hash(password, 10);
    const userName = name?.trim() || normalizedEmail.split('@')[0];

    db.prepare(`
      INSERT INTO users (id, name, email, password_hash)
      VALUES (?, ?, ?, ?)
    `).run(id, userName, normalizedEmail, passwordHash);

    const token = jwt.sign({ id, email: normalizedEmail, name: userName }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: { id, name: userName, email: normalizedEmail }
    });
  } catch (error: any) {
    console.error('[Signup Error]', error);
    res.status(500).json({ error: 'Failed to create account.' });
  }
});

// LOGIN
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required.' });
  }

  const normalizedEmail = email.trim().toLowerCase();

  try {
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(normalizedEmail) as any;
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error: any) {
    console.error('[Login Error]', error);
    res.status(500).json({ error: 'Failed to log in.' });
  }
});

// GET CURRENT USER
app.get('/api/auth/me', authGuard, (req, res) => {
  const user = (req as any).user;
  res.json({ user });
});

// ── Protected Scanner Endpoint ──
app.get('/api/analyze', authGuard, async (req, res) => {
  const url = req.query.url as string;

  if (!url || typeof url !== 'string' || url.trim().length === 0) {
    return res.status(400).json({ error: 'Missing or invalid `url` parameter' });
  }

  try {
    console.log(`[HowBuilt API] Scanning target URL: ${url}`);
    const result = await analyzeWebsite(url);
    res.json(result);
  } catch (error: any) {
    console.error(`[HowBuilt API Error]`, error);
    res.status(500).json({ error: 'Failed to analyze website', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`⚡ HowBuilt Backend API running on http://localhost:${PORT}`);
});
