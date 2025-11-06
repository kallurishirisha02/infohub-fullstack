// routes/weather.js
import express from "express";
import { fetchWeatherForCity } from "../services/externalApis.js";

const router = express.Router();

// GET /api/weather?city=Hyderabad
router.get("/", async (req, res) => {
  const city = req.query.city || "Hyderabad";

  try {
    const data = await fetchWeatherForCity(city);
    res.json({ success: true, data });
  } catch (error) {
    console.error("Weather error:", error.message);

    if (error.response?.status === 404) {
      return res.status(404).json({ error: `City not found: ${city}` });
    }

    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

export default router;
