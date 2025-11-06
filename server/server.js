// server.js
import dotenv from "dotenv";
dotenv.config(); // ✅ must be first, before all imports

console.log("Loaded WEATHER_KEY:", process.env.WEATHER_KEY);



import express from "express";
import cors from "cors";

import quoteRouter from "./routes/quote.js";
import weatherRouter from "./routes/weather.js";
import currencyRouter from "./routes/currency.js";

const app = express();
app.use(cors());
app.use(express.json());

// Mount routes
app.use("/api/quote", quoteRouter);
app.use("/api/weather", weatherRouter);
app.use("/api/currency", currencyRouter);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
