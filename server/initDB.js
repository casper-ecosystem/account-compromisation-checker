import sqlite3 from "sqlite3";
import fs from "fs";
import crypto from "crypto";

(async () => {
  const db = new sqlite3.Database("./database.db");

  await db.exec(`
    CREATE TABLE IF NOT EXISTS publicKeys (
      id TEXT PRIMARY KEY
    );
  `);

  const data = fs.readFileSync("./accounts.json", "utf8");
  const accounts = JSON.parse(data);

  for (const account of accounts) {
    const hash = crypto.createHash("sha256").update(account).digest("hex");
    await db.run("INSERT INTO publicKeys (id) VALUES (?)", hash);
  }

  console.log("Database initialized with sample data");
})();
