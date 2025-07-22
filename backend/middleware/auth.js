const authService = require('../services/authService');
const User = require('../models/User');

// Основне middleware для автентифікації
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        message: 'Токен доступу не надано' 
      });
    }

    const token = authHeader.split(' ')[1];
    const payload = authService.verifyAccessToken(token);

    if (!payload) {
      return res.status(401).json({ 
        success: false, 
        message: 'Недійсний токен доступу' 
      });
    }

    // Перевіряємо чи користувач все ще активний
    const user = await User.findById(payload.userId);
    if (!user || !user.isActive) {
      return res.status(401).json({ 
        success: false, 
        message: 'Користувач не активний' 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Помилка сервера автентифікації' 
    });
  }
};

// Middleware для перевірки ролі
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Не автентифіковано' 
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: 'Недостатньо прав доступу' 
      });
    }

    next();
  };
};

module.exports = { authenticate, authorize };