const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());

// IMPORTANT: supports base64 images
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// LOGIN (hardcoded)
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "bkr" && password === "bkrtkr") {
    return res.json({ success: true });
  }

  res.json({ success: false });
});

// CREATE POST
app.post("/posts", (req, res) => {
  const { text, image } = req.body;

  const date = new Date().toLocaleString();

  db.run(
    "INSERT INTO posts (text, image, created_at) VALUES (?, ?, ?)",
    [text, image, date],
    function (err) {
      if (err) console.log(err);
      res.json({ id: this.lastID });
    }
  );
});

// GET ALL POSTS
app.get("/posts", (req, res) => {
  db.all("SELECT * FROM posts ORDER BY id DESC", (err, rows) => {
    res.json(rows);
  });
});

// GET SINGLE POST
app.get("/posts/:id", (req, res) => {
  db.get("SELECT * FROM posts WHERE id=?", [req.params.id], (err, row) => {
    res.json(row);
  });
});

// DELETE POST
app.delete("/posts/:id", (req, res) => {
  db.run("DELETE FROM posts WHERE id=?", [req.params.id]);
  res.json({ success: true });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});