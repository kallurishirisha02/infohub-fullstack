// routes/currency.js
import express from "express";
import { fetchExchangeRatesINR } from "../services/externalApis.js";

const router = express.Router();

// GET /api/currency?amount=100
router.get("/", async (req, res) => {
  const amountRaw = req.query.amount;
  const amount = amountRaw ? Number(amountRaw) : 1;

  if (isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount. Provide a positive number." });
  }

  try {
    const rates = await fetchExchangeRatesINR();

    const usdRate = rates.USD;
    const eurRate = rates.EUR;

    if (!usdRate || !eurRate) {
      throw new Error("Missing USD or EUR rates in API response");
    }

    const usd = (amount * usdRate).toFixed(2);
    const eur = (amount * eurRate).toFixed(2);

    res.json({
      success: true,
      amountINR: amount,
      converted: { USD: usd, EUR: eur },
    });
  } catch (error) {
    console.error("Currency error:", error.message);
    res.status(500).json({ error: "Failed to fetch currency data" });
  }
});

export default router;
