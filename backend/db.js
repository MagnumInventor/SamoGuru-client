//backend/db.js
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("mongodb_uri:", process.env.MONGODB_URI);
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB підєднанно до: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB помилка зєднання", error.message);
    process.exit(1); //1 - помилка, 0 - успіх
  }
};

