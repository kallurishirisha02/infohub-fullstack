// routes/quote.js
import express from "express";
import { fetchQuoteFromExternal } from "../services/externalApis.js";

const router = express.Router();

// Local fallback quotes (in case API fails)
const localQuotes = [
  { quote: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { quote: "Don’t watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { quote: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
];

router.get("/", async (req, res) => {
  try {
    // Try fetching from external API
    try {
      const data = await fetchQuoteFromExternal();
      return res.json({ source: "external", ...data });
    } catch (err) {
      // Fallback to local quotes if API fails
      const random = Math.floor(Math.random() * localQuotes.length);
      return res.json({ source: "local", ...localQuotes[random] });
    }
  } catch (error) {
    console.error("Quote error:", error.message);
    res.status(500).json({ error: "Could not fetch quote" });
  }
});

export default router;
