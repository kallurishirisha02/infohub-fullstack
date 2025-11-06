import { useState } from "react";
import axios from "axios";

export default function QuoteGenerator() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getQuote = async () => {
    try {
    
      const res = await axios.get("https://infohub-fullstack-production.up.railway.app/api/quote");

      setQuote(res.data);
      setError("");
    } catch {
      setError("Failed to fetch quote.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <h2>Motivational Quotes</h2>
      <button className="primary" onClick={getQuote}>Generate Quote</button>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {quote && (
        <div>
          <p className="italic">"{quote.quote}"</p>
          <p>- {quote.author}</p>
        </div>
      )}
    </div>
  );
}
