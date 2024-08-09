import sqlite3 from "sqlite3";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

(async () => {
  const db = new sqlite3.Database("./database.db");

  await db.exec(`
    CREATE TABLE IF NOT EXISTS publicKeys (
      id TEXT PRIMARY KEY
    );
  `);

  const accounts = process.env.PUBLIC_KEYS.split(",");

  for (const account of accounts) {
    const hash = crypto.createHash("sha256").update(account).digest("hex");
    await db.run("INSERT INTO publicKeys (id) VALUES (?)", hash);
  }

  console.log("Database initialized with sample data");
})();
