import 'dotenv/config';
import express from "express";
import { PrismaClient } from "../../node_modules/.prisma/client/default";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const app = express();
const PORT = 4000;

/* ---------- middleware ---------- */
app.use(express.json()); // parses application/json bodies

/* ---------- fake users ---------- */
const users = [{ id: 1, email: "demo@example.com", password: "secret" }];

/* ---------- routes ---------- */
app.get("/", (_, res) => res.send("OK ðŸ”¥"));

app.post("/register", async (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) return res.status(400).json({ error: "Missing email or password" });

  try {
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(409).json({ error: "Email already in use" });

    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hash },
      select: { id: true, email: true, createdAt: true },
    });

    return res.status(201).json(user);
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) return res.status(400).json({ error: "Missing email or password" });

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    return res.json({ token: `fake-token-${user.id}` });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});




/* ---------- start ---------- */
app.listen(PORT, () => {
  console.log(`API ready on http://localhost:${PORT}`);
});


