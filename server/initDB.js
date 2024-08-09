import mysql from "mysql2/promise";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

(async () => {

  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQL_DATABASE}\`;`);

  await connection.changeUser({ database: process.env.MYSQL_DATABASE });

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS \`${process.env.MYSQL_TABLE}\` (
      id VARCHAR(64) PRIMARY KEY
    );
  `);

  const accounts = process.env.PUBLIC_KEYS.split(",");

  for (const account of accounts) {
    const hash = crypto.createHash("sha256").update(account).digest("hex");
    await connection.execute(`INSERT INTO \`${process.env.MYSQL_TABLE}\` (id) VALUES (?)`, [hash]);
  }

  console.log("Database initialized with data");

  await connection.end();
})();
