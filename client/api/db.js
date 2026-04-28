import sqlite3 from "sqlite3";

const db = new sqlite3.Database("/tmp/abstuff.db");

// create table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT,
      image TEXT,
      created_at TEXT
    )
  `);
});

export default db;