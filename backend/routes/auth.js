const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// POST /api/register
router.post('/register', async (req, res) => {
  const { firstName, lastName, phone, password, role } = req.body;

  if (!firstName || !lastName || !phone || !password || !role)
    return res.status(400).json({ message: 'Всі поля обовʼязкові' });

  try {
    const existingUser = await User.findOne({ phone });
    if (existingUser) return res.status(400).json({ message: 'Користувач з таким номером вже існує' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName, lastName, phone, role, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Користувач створений успішно' });
  } catch (err) {
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

// POST /api/login
router.post('/login', async (req, res) => {
  const { phone, password } = req.body;

  try {
    const user = await User.findOne({ phone });
    if (!user) return res.status(401).json({ message: 'Користувача не знайдено' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Невірний пароль' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: { firstName: user.firstName, lastName: user.lastName, phone: user.phone, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

module.exports = router;
