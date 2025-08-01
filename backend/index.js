//backend/index.js
import cookieParser from 'cookie-parser';
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import { connectDB } from "./db.js";

import authRoutes from "./routes/auth.route.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://www.samoguru.run.place', 'https://samoguru.run.place']
    : 'http://localhost:3000',
  credentials: true
}));

app.use(express.json()); // дозволояє парсити запити
app.use(cookieParser()); // дозволояє парсити вхідні cookies

app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === 'production') {
  // Serve static files from Next.js build
  app.use(express.static(path.join(__dirname, '../.next/static')));
  
  // Serve the Next.js build files
  const nextBuildPath = path.join(__dirname, '../.next/server/app');
  app.use(express.static(nextBuildPath));
  
  // For all other requests, serve the Next.js app
  app.get('*', (req, res) => {
    // Only if it's not an API request
    if (!req.path.startsWith('/api/')) {
      res.sendFile(path.join(__dirname, '../.next/server/app/index.html'));
    } else {
      res.status(404).json({ error: 'API endpoint not found' });
    }
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("Сервер працює на порті:", PORT);
});