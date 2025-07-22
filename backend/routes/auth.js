const express = require('express');
const rateLimit = require('express-rate-limit');
const User = require('../models/User');
const authService = require('../services/authService');
const emailService = require('../services/emailService');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// Rate limiting для автентифікації
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 хвилин
  max: 5, // максимум 5 спроб входу
  message: { 
    success: false, 
    message: 'Забагато спроб входу. Спробуйте пізніше.' 
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Вхід в систему
router.post('/login', authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Валідація
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email та пароль обов\'язкові'
      });
    }

    // Пошук користувача
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Невірні облікові дані'
      });
    }

    // Перевірка пароля
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Невірні облікові дані'
      });
    }

    // Генерація токенів
    const { accessToken, refreshToken } = authService.generateTokens(user._id, user.role);
    
    // Збереження refresh токену
    await authService.saveRefreshToken(user._id, refreshToken);

    // Оновлення часу останнього входу
    user.lastLogin = new Date();
    await user.save();

    // HTTP-only cookie для refresh токену (більш безпечно)
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 днів
    });

    res.json({
      success: true,
      message: 'Успішний вхід в систему',
      data: {
        user: user.toJSON(),
        accessToken
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Помилка сервера'
    });
  }
});

// Оновлення токену
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh токен не надано'
      });
    }

    // Верифікація refresh токену
    const payload = await authService.verifyRefreshToken(refreshToken);
    if (!payload) {
      return res.status(401).json({
        success: false,
        message: 'Недійсний refresh токен'
      });
    }

    // Пошук користувача
    const user = await User.findById(payload.userId);
    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Користувач не знайдений'
      });
    }

    // Генерація нових токенів
    const tokens = authService.generateTokens(user._id, user.role);
    
    // Збереження нового refresh токену
    await authService.saveRefreshToken(user._id, tokens.refreshToken);

    // Оновлення cookie
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      success: true,
      data: {
        accessToken: tokens.accessToken
      }
    });

  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(500).json({
      success: false,
      message: 'Помилка сервера'
    });
  }
});

// Вихід з системи
router.post('/logout', authenticate, async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (refreshToken) {
      await authService.removeRefreshToken(refreshToken);
    }

    res.clearCookie('refreshToken');
    
    res.json({
      success: true,
      message: 'Успішний вихід з системи'
    });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Помилка сервера'
    });
  }
});

// Реєстрація користувача (тільки для адмінів)
router.post('/register', authenticate, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const { email, password, firstName, lastName, role, department } = req.body;

    // Валідація
    if (!email || !password || !firstName || !lastName || !department) {
      return res.status(400).json({
        success: false,
        message: 'Всі поля обов\'язкові'
      });
    }

    // Перевірка чи користувач вже існує
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Користувач з таким email вже існує'
      });
    }

    // Створення користувача
    const emailVerificationToken = authService.generateEmailVerificationToken();
    
    const user = new User({
      email: email.toLowerCase(),
      password,
      firstName,
      lastName,
      role: role || 'employee',
      department,
      emailVerificationToken,
      createdBy: req.user._id
    });

    await user.save();

    // Відправка email верифікації
    await emailService.sendVerificationEmail(user.email, emailVerificationToken);

    res.status(201).json({
      success: true,
      message: 'Користувач створений. Перевірте email для активації.',
      data: { user: user.toJSON() }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Помилка сервера'
    });
  }
});

// Верифікація email
router.get('/verify-email/:token', async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ emailVerificationToken: token });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Недійсний токен верифікації'
      });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    await user.save();

    // Редірект на фронтенд
    res.redirect(`${process.env.CLIENT_URL}/login?verified=true`);

  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Помилка сервера'
    });
  }
});

// Отримання профілю користувача
router.get('/me', authenticate, async (req, res) => {
  res.json({
    success: true,
    data: { user: req.user.toJSON() }
  });
});

module.exports = router;