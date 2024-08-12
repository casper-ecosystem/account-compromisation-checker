import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import cors from "cors";
import axios from "axios";

dotenv.config();

const app = express();
const port = 3001;

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["POST"],
  })
);

app.use(bodyParser.json());

app.post("/check", async (req, res) => {
  const { captchaValue, hash } = req.body;

  if (!captchaValue) {
    return res.status(400).json({ error: "Please complete the reCAPTCHA" });
  }

  const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${captchaValue}`;

  try {
    const captchaResponse = await axios.post(verificationURL);
    const captchaData = captchaResponse.data;

    if (!captchaData.success) {
      return res.status(400).json({ error: "Invalid reCAPTCHA" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to verify reCAPTCHA" });
  }
  try {
    const [rows] = await pool.query(`SELECT 1 FROM \`${process.env.MYSQL_TABLE}\` WHERE id = ?`, [hash]);

    if (rows.length > 0) {
      res.json({
        success: true,
        message: "Captcha and text verified successfully",
      });
    } else {
      res.json({
        success: false,
        message: "Text does not exist in the database",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to check database" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
