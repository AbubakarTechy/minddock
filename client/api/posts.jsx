import db from "./db";

export default function handler(req, res) {
  // GET ALL POSTS
  if (req.method === "GET") {
    db.all("SELECT * FROM posts ORDER BY id DESC", (err, rows) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(rows);
    });
  }

  // CREATE POST
  else if (req.method === "POST") {
    const { text, image } = req.body;

    const date = new Date().toLocaleString();

    db.run(
      "INSERT INTO posts (text, image, created_at) VALUES (?, ?, ?)",
      [text, image, date],
      function (err) {
        if (err) return res.status(500).json(err);
        res.status(200).json({ id: this.lastID });
      }
    );
  }

  // DELETE POST
  else if (req.method === "DELETE") {
    const { id } = req.query;

    db.run("DELETE FROM posts WHERE id=?", [id], (err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ success: true });
    });
  }

  else {
    res.status(405).json({ message: "Method not allowed" });
  }
}