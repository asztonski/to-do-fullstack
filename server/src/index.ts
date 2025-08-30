import express from "express";

const app = express();
const PORT = 4000;

/* ---------- middleware ---------- */
app.use(express.json()); // parses application/json bodies

/* ---------- fake users ---------- */
const users = [{ id: 1, email: "demo@example.com", password: "secret" }];

/* ---------- routes ---------- */
app.get("/", (_, res) => res.send("OK 🔥"));

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // In a real app you'd sign a JWT; here we return a dummy token
  res.json({ token: "fake-token-" + user.id });
});

/* ---------- start ---------- */
app.listen(PORT, () => {
  console.log(`API ready on http://localhost:${PORT}`);
});
