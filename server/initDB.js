import sqlite3 from "sqlite3";

(async () => {
	const db = new sqlite3.Database("./database.db");

	await db.exec(`
    CREATE TABLE IF NOT EXISTS publicKeys (
      id TEXT PRIMARY KEY
    );
  `);

	const insertData = [
		"019cf922e91f564896175b9bf6850788ebaa0c8a809d940570f8dd6f0bd5ed822d",
		"0106ca7c39cd272dbf21a86eeb3b36b7c26e2e9b94af64292419f7862936bca2ca",
		"0109b48a169e6163078a07b6248f330133236c6e390fe915813c187c3f268c213e"
	];

	for (const id of insertData) {
		await db.run("INSERT INTO publicKeys (id) VALUES (?)", id);
	}

	console.log("Database initialized with sample data");
})();
