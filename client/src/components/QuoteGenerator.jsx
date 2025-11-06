import { useState } from "react";
import axios from "axios";

export default function QuoteGenerator() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchQuote = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get("https://infohub-fullstack-production.up.railway.app/api/quote");
      setQuote(res.data);
    } catch (err) {
      setError("Failed to fetch quote. Please try again.");
      console.error("Quote fetch error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <h2>Quote Generator</h2>
      <button className="primary" onClick={fetchQuote}>
        Generate Quote
      </button>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {quote && (
        <div className="italic">
          “{quote.text}”
          <p>- {quote.author}</p>
        </div>
      )}
    </div>
  );
}
