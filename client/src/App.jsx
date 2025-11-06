import { useState } from "react";
import WeatherModule from "./components/WeatherModule";
import CurrencyConverter from "./components/CurrencyConverter";
import QuoteGenerator from "./components/QuoteGenerator";
import "./index.css";

function App() {
  const [activeTab, setActiveTab] = useState("weather");

  return (
    <div>
      <h1 style={{color:"#059669"}}>InfoHub 🌍</h1>

      <div className="tabs">
        <button
          className={activeTab === "weather" ? "active" : ""}
          onClick={() => setActiveTab("weather")}
        >
          Weather
        </button>
        <button
          className={activeTab === "currency" ? "active" : ""}
          onClick={() => setActiveTab("currency")}
        >
          Currency
        </button>
        <button
          className={activeTab === "quote" ? "active" : ""}
          onClick={() => setActiveTab("quote")}
        >
          Quotes
        </button>
      </div>

      <div className="container">
        {activeTab === "weather" && <WeatherModule />}
        {activeTab === "currency" && <CurrencyConverter />}
        {activeTab === "quote" && <QuoteGenerator />}
      </div>
    </div>
  );
}

export default App;   



/*
import { useState } from "react";
import WeatherModule from "./components/WeatherModule";
import CurrencyConverter from "./components/CurrencyConverter";
import QuoteGenerator from "./components/QuoteGenerator";
import "./index.css";

function App() {
  const [activeTab, setActiveTab] = useState("weather");

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>InfoHub 🌐</h1>
        <p>Your daily weather, currency & motivation — in one place!</p>
      </header>

      <div className="tab-buttons">
        <button
          className={activeTab === "weather" ? "active" : ""}
          onClick={() => setActiveTab("weather")}
        >
          🌦 Weather
        </button>
        <button
          className={activeTab === "currency" ? "active" : ""}
          onClick={() => setActiveTab("currency")}
        >
          💱 Currency
        </button>
        <button
          className={activeTab === "quote" ? "active" : ""}
          onClick={() => setActiveTab("quote")}
        >
          💬 Quotes
        </button>
      </div>

      <div className="card">
        {activeTab === "weather" && <WeatherModule />}
        {activeTab === "currency" && <CurrencyConverter />}
        {activeTab === "quote" && <QuoteGenerator />}
      </div>

      <footer className="footer">Made with ❤️ by Shirisha</footer>
    </div>
  );
}

export default App;*/

