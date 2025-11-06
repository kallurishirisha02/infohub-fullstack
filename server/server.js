import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

// ✅ Initialize Express app FIRST
const app = express();
app.use(cors());
app.use(express.json());

// ✅ Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- QUOTE ROUTE (LOCAL JSON) ---
app.get("/api/quote", (req, res) => {
  try {
    const quotesPath = path.resolve(__dirname, "./data/quotes.json");
    console.log("📂 Quotes file path:", quotesPath);

    if (!fs.existsSync(quotesPath)) {
      console.error("❌ quotes.json not found");
      return res.status(404).json({ error: "Quotes file missing" });
    }

    const fileData = fs.readFileSync(quotesPath, "utf-8");
    const quotes = JSON.parse(fileData);

    if (!quotes.length) {
      return res.status(500).json({ error: "No quotes found" });
    }

    const random = quotes[Math.floor(Math.random() * quotes.length)];
    res.json({
      success: true,
      text: random.text,
      author: random.author,
    });
  } catch (err) {
    console.error("💥 Quote route error:", err.message);
    res.status(500).json({ error: "Failed to fetch quote" });
  }
});

// --- WEATHER ROUTE ---
app.get("/api/weather", async (req, res) => {
  try {
    const city = req.query.city || "Hyderabad";
    const apiKey = process.env.WEATHER_KEY;
    if (!apiKey) throw new Error("Missing WEATHER_KEY");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);

    res.json({
      success: true,
      data: {
        city: response.data.name,
        temperature: response.data.main.temp,
        condition: response.data.weather[0].description,
      },
    });
  } catch (err) {
    console.error("Weather error:", err.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

// --- CURRENCY ROUTE ---
app.get("/api/currency", async (req, res) => {
  try {
    const amount = req.query.amount || 1;
    const apiKey = process.env.CURRENCY_KEY;
    if (!apiKey) throw new Error("Missing CURRENCY_KEY");

    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/INR`;
    const response = await axios.get(url);

    res.json({
      success: true,
      converted: {
        USD: (amount * response.data.conversion_rates.USD).toFixed(2),
        EUR: (amount * response.data.conversion_rates.EUR).toFixed(2),
      },
    });
  } catch (err) {
    console.error("Currency error:", err.message);
    res.status(500).json({ error: "Failed to fetch currency data" });
  }
});

// --- HEALTH CHECK ---
app.get("/", (req, res) => {
  res.send("✅ InfoHub backend is running successfully on Railway!");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
