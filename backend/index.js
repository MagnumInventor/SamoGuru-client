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

app.use(cors ({ origin: "https://www.samoguru.run.place", credentials: true }));
app.use(express.json()); // дозволояє парсити запити
app.use(cookieParser()); // дозволояє парсити вхідні cookies

app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === 'production') {
	// Сервіруємо статичні файли з Next.js білду
	app.use(express.static(path.join(__dirname, '../.next/static')));
	app.use(express.static(path.join(__dirname, '../out')));
	
	// Для всіх інших запитів віддаємо index.html (SPA fallback)
	app.get('*', (req, res) => {
	  // Тільки якщо це не API запит
	  if (!req.path.startsWith('/api/')) {
	    res.sendFile(path.join(__dirname, '../out/index.html'));
	  } else {
	    res.status(404).json({ error: 'API endpoint not found' });
	  }
	});
   }

app.use(cors({
	origin: process.env.NODE_ENV === 'production' 
	  ? false 
	  : 'http://localhost:3000',
	credentials: true
   }));

app.listen(PORT, () => {
  connectDB();
  console.log("Сервер працює на порті:", PORT);
});