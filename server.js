import express from "express";
import axios from "axios";
import cors from "cors";

// Only load dotenv in development
if (process.env.NODE_ENV !== "production") {
  const dotenv = await import("dotenv");
  dotenv.config();
}

const app = express();
app.use(cors());

app.get("/weather", async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: "City is required" });

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_KEY}&units=metric`
    );
    res.json(response.data);
  } catch (err) {
    console.error("❌ API error:", err.response?.data || err.message);
    res.status(err.response?.status || 500).json({
      error: "Failed to fetch weather data",
      details: err.response?.data || err.message,
    });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
