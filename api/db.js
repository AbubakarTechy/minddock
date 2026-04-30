import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { sql } from "@vercel/postgres";

// Attempt to create the table if we have connection details
if (process.env.POSTGRES_URL) {
  sql`
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      text TEXT,
      image TEXT,
      created_at TEXT
    );
  `.catch(err => console.error("Database setup error:", err));
}

export default sql;