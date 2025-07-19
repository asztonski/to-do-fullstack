import express from "express";

const app = express();
const PORT = 4000;

// built-in JSON body parser
app.use(express.json());

// basic health check
app.get("/", (_, res) => res.send("OK 🔥"));

app.listen(PORT, () => {
  console.log(`API ready on http://localhost:${PORT}`);
});
