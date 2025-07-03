// server/index.js

const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

//const authRoutes = require('./routes/auth');
//app.use('/api/auth', authRoutes);

// Middleware
app.use(cors()); // дозволяє запити з фронтенду
app.use(express.json()); // парсить JSON запити

// Підключення до бази даних
connectDB()
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // завершити процес, якщо підключення провалено
  });

// Роутинг
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Системний ping (для перевірки)
app.get('/', (req, res) => {
  res.send('✅ Samoguru API is running');
});

// Запуск сервера
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});