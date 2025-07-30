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
const _dirname = path.resolve();

app.use(cors ({ origin: "https://www.samoguru.run.place", credentials: true }));
app.use(express.json()); // дозволояє парсити запити
app.use(cookieParser()); // дозволояє парсити вхідні cookies

app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "/", "dist", "index.html"));
	});
}


app.listen(PORT, () => {
  connectDB();
  console.log("Сервер працює на порті:", PORT);
});