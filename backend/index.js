//backend/index.js
import cookieParser from 'cookie-parser';
import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./db.js";

import authRoutes from "./routes/auth.route.js";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // дозволояє парсити запити
app.use(cookieParser()); // дозволояє парсити вхідні cookies

app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  connectDB();
  console.log("Сервер працює на порті:", PORT);
});