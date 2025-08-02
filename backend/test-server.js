import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://www.samoguru.run.place', 'https://samoguru.run.place']
    : 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Simple test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Test route working" });
});

app.listen(PORT, () => {
  console.log("Test server running on port:", PORT);
}); 