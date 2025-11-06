import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

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


// --- QUOTE ROUTE ---
app.get("/api/quote", async (req, res) => {
  try {
    const response = await axios.get("https://api.quotable.io/random");
    res.json({
      success: true,
      text: response.data.content,
      author: response.data.author,
    });
  } catch (err) {
    console.error("Quote error:", err.message);
    res.status(500).json({ error: "Failed to fetch quote" });
  }
});



app.get("/", (req, res) => {
  res.send("✅ InfoHub backend is running successfully on Railway!");
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));


