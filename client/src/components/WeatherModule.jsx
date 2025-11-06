import { useState, useEffect } from "react";
import axios from "axios";

export default function WeatherModule() {
  const [city, setCity] = useState("Hyderabad");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (cityName) => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:3001/api/weather?city=${cityName}`);
      setData(res.data.data);
      setError("");
    } catch {
      setError("Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  return (
    <div className="weather-card">
      <h2>🌦 Weather Info</h2>
      <div className="weather-input-group">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button className="primary" onClick={() => fetchWeather(city)}>
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {data && (
        <div className="weather-result">
          <p><b>City:</b> {data.city}</p>
          <p><b>Temp:</b> {data.temperature}°C</p>
          <p><b>Condition:</b> {data.condition}</p>
        </div>
      )}
    </div>
  );
}
