import express from "express";
import { PrismaClient } from "../../node_modules/.prisma/client/default";

const prisma = new PrismaClient();

const app = express();
const PORT = 4000;

/* ---------- middleware ---------- */
app.use(express.json()); // parses application/json bodies

/* ---------- fake users ---------- */
const users = [{ id: 1, email: "demo@example.com", password: "secret" }];

/* ---------- routes ---------- */
app.get("/", (_, res) => res.send("OK 🔥"));

app.post("/login", async (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) {
    return res.status(400).json({ error: "Missing email or password" });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Na razie “fałszywy” token – później podmienimy na JWT
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
