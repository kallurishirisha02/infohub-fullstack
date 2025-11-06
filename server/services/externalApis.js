// services/externalApis.js

import axios from "axios";
import dotenv from "dotenv";
dotenv.config(); // ✅ ensures .env variables load in this file too

const WEATHER_KEY = process.env.WEATHER_KEY;
const CURRENCY_KEY = process.env.CURRENCY_KEY;

// 🔹 Fetch random quote from external API
export async function fetchQuoteFromExternal() {
  const url = "https://api.quotable.io/random";
  const resp = await axios.get(url, { timeout: 5000 });
  return { quote: resp.data.content, author: resp.data.author };
}

// 🔹 Fetch weather details for a city
export async function fetchWeatherForCity(city = "Hyderabad") {
  if (!WEATHER_KEY) throw new Error("Missing WEATHER_KEY");

  const url = `https://api.openweathermap.org/data/2.5/weather`;
  const resp = await axios.get(url, {
    params: { q: city, appid: WEATHER_KEY, units: "metric" },
    timeout: 7000,
  });

  const { name } = resp.data;
  const temperature = resp.data.main?.temp;
  const condition = resp.data.weather?.[0]?.description;

  return { city: name || city, temperature, condition };
}

// 🔹 Fetch currency exchange rates (INR → USD, EUR)
export async function fetchExchangeRatesINR() {
  if (!CURRENCY_KEY) throw new Error("Missing CURRENCY_KEY");

  const url = `https://v6.exchangerate-api.com/v6/${CURRENCY_KEY}/latest/INR`;
  const resp = await axios.get(url, { timeout: 7000 });

  const rates = resp.data?.conversion_rates || resp.data?.rates || null;
  if (!rates) throw new Error("Unexpected currency API response");

  return rates; // Contains USD, EUR, etc.
}
