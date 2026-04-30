import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();

app.use(cors());

// IMPORTANT: supports base64 images
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// LOGIN (hardcoded)
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "bkr" && password === "bkrtkr") {
    return res.json({ success: true });
  }

  res.json({ success: false });
});

// CREATE POST
app.post("/api/posts", async (req, res) => {
  const { text, image } = req.body;
  const date = new Date().toLocaleString();

  try {
    const result = await db`
      INSERT INTO posts (text, image, created_at) 
      VALUES (${text}, ${image}, ${date})
      RETURNING id;
    `;
    res.json({ id: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create post" });
  }
});

// GET ALL POSTS
app.get("/api/posts", async (req, res) => {
  try {
    const result = await db`SELECT * FROM posts ORDER BY id DESC`;
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// GET SINGLE POST
app.get("/api/posts/:id", async (req, res) => {
  try {
    const result = await db`SELECT * FROM posts WHERE id=${req.params.id}`;
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

// DELETE POST
app.delete("/api/posts/:id", async (req, res) => {
  try {
    await db`DELETE FROM posts WHERE id=${req.params.id}`;
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete post" });
  }
});

import { fileURLToPath } from "url";

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
  });
}

export default app;