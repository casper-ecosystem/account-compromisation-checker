import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import dotenv from "dotenv";
import sqlite3 from "sqlite3";
import cors from "cors";
import axios from "axios";

dotenv.config();

const app = express();
const port = 3001;

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

const db = new sqlite3.Database("./database.db");

app.use(cors());
app.use(bodyParser.json());

app.post("/check", async (req, res) => {
  const { captchaValue, textValue } = req.body;

  if (!captchaValue) {
    return res.status(400).json({ error: "Please complete the reCAPTCHA" });
  }

  const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${captchaValue}`;

  try {
    // Verify reCAPTCHA
    const captchaResponse = await axios.post(verificationURL);
    const captchaData = captchaResponse.data;

    if (!captchaData.success) {
      return res.status(400).json({ error: "Invalid reCAPTCHA" });
    }

    // Verify text value
    db.get("SELECT 1 FROM publicKeys WHERE id = ?", [textValue], (err, row) => {
      if (err) {
        return res.status(500).json({ error: "Failed to check text" });
      }

      if (row) {
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
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to verify reCAPTCHA" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
