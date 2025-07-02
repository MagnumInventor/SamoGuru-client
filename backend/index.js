const express = require('express');
const connectDB = require('./db');
require('dotenv').config();

const app = express();
app.use(express.json());

// Підключення до бази
connectDB();

// Підключення роутів
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes); // <-- Додаємо цей рядок

// Роут (тимчасово)
app.get('/', (req, res) => {
  res.send('Samoguru API working');
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});