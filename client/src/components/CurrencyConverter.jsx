import { useState } from "react";
import axios from "axios";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const convert = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/currency?amount=${amount || 1}`);
      setResult(res.data.converted);
      setError("");
    } catch {
      setError("Failed to convert currency.");
    }
  };

  return (
    <div className="currency-card">
      <h2>💱 Currency Converter</h2>
      <div className="currency-input-group">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount in INR"
        />
        <button className="primary" onClick={convert}>Convert</button>
      </div>

      {error && <p className="error">{error}</p>}
      {result && (
        <div className="currency-result">
          <p><b>USD:</b> {result.USD}</p>
          <p><b>EUR:</b> {result.EUR}</p>
        </div>
      )}
    </div>
  );
}
