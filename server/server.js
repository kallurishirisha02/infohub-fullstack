import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- QUOTE ROUTE (Local JSON) ---
app.get("/api/quote", (req, res) => {
  try {
    const quotesPath = path.join(__dirname, "data", "quotes.json");
    const quotesData = fs.readFileSync(quotesPath, "utf-8");
    const quotes = JSON.parse(quotesData);

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    res.json({
      success: true,
      text: randomQuote.text,
      author: randomQuote.author,
    });
  } catch (err) {
    console.error("Quote fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch local quote" });
  }
});
