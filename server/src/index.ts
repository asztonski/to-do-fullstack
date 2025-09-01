// server/src/index.ts
import 'dotenv/config';
import express from 'express';
import { PrismaClient } from '../../node_modules/.prisma/client/index';
import bcrypt from 'bcryptjs';
import { signToken, auth } from './jwt';

const prisma = new PrismaClient();
const app = express();
const PORT = 4000;

/* ---------- CORS (bez path-to-regexp) ---------- */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Vary', 'Origin');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

/* ---------- middleware ---------- */
app.use(express.json());

/* ---------- health ---------- */
app.get('/', (_, res) => res.send('OK 🔥'));

/* ---------- auth routes ---------- */
app.post('/register', async (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) return res.status(400).json({ error: 'Missing email or password' });

  try {
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(409).json({ error: 'Email already in use' });

    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hash },
      select: { id: true, email: true, createdAt: true },
    });

    return res.status(201).json(user);
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) return res.status(400).json({ error: 'Missing email or password' });

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    const token = signToken({ sub: user.id, email: user.email });
    return res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

/* ---------- protected: profile ---------- */
app.get('/me', auth, (req, res) => {
  return res.json((req as any).user); // { sub, email, iat, exp }
});

/* ---------- protected: todos ---------- */
app.get('/todos', auth, async (req, res) => {
  const userId = (req as any).user.sub as number;
  try {
    const rows = await prisma.todo.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: { id: true, text: true, done: true, createdAt: true },
    });
    const todos = rows.map(r => ({
      id: r.id,
      title: r.text,
      completed: r.done,
      createdAt: r.createdAt,
    }));
    res.json(todos);
  } catch (err) {
    console.error('Todos list error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/todos', auth, async (req, res) => {
  const userId = (req as any).user.sub as number;
  const { title, text } = req.body ?? {};
  const value = typeof title === 'string' ? title : typeof text === 'string' ? text : '';
  if (!value) return res.status(400).json({ error: 'Missing title' });

  try {
    const row = await prisma.todo.create({
      data: { text: value, userId },
      select: { id: true, text: true, done: true, createdAt: true },
    });
    res.status(201).json({
      id: row.id,
      title: row.text,
      completed: row.done,
      createdAt: row.createdAt,
    });
  } catch (err) {
    console.error('Todo create error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.patch('/todos/:id', auth, async (req, res) => {
  const userId = (req as any).user.sub as number;
  const id = Number(req.params.id);
  const { title, text, completed, done } = req.body ?? {};

  const data: any = {};
  if (typeof title === 'string') data.text = title;
  if (typeof text === 'string') data.text = text;
  if (typeof completed === 'boolean') data.done = completed;
  if (typeof done === 'boolean') data.done = done;
  if (!Object.keys(data).length) return res.status(400).json({ error: 'Nothing to update' });

  try {
    const updated = await prisma.todo.updateMany({ where: { id, userId }, data });
    if (updated.count === 0) return res.status(404).json({ error: 'Todo not found' });

    const row = await prisma.todo.findFirst({
      where: { id, userId },
      select: { id: true, text: true, done: true, createdAt: true },
    });
    res.json({
      id: row!.id,
      title: row!.text,
      completed: row!.done,
      createdAt: row!.createdAt,
    });
  } catch (err) {
    console.error('Todo update error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/todos/:id', auth, async (req, res) => {
  const userId = (req as any).user.sub as number;
  const id = Number(req.params.id);
  try {
    const deleted = await prisma.todo.deleteMany({ where: { id, userId } });
    if (deleted.count === 0) return res.status(404).json({ error: 'Todo not found' });
    res.status(204).end();
  } catch (err) {
    console.error('Todo delete error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

/* ---------- start ---------- */
app.listen(PORT, () => {
  console.log(`API ready on http://localhost:${PORT}`);
});
