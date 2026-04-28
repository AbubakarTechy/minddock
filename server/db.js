const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./abstuff.db");

db.run(`
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text TEXT,
  image TEXT,
  created_at TEXT
)
`);

module.exports = db;