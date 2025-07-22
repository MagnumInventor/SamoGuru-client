const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');

class AuthService {
  // Генерація JWT токенів
  generateTokens(userId, userRole) {
    const payload = { userId, role: userRole };
    
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: process.env.JWT_ACCESS_EXPIRE || '15m'
    });
    
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d'
    });
    
    return { accessToken, refreshToken };
  }

  // Збереження refresh токену
  async saveRefreshToken(userId, refreshToken) {
    // Видаляємо старі токени користувача
    await RefreshToken.deleteMany({ userId, isActive: true });
    
    // Створюємо новий токен
    const tokenDoc = new RefreshToken({
      token: refreshToken,
      userId
    });
    
    await tokenDoc.save();
    return tokenDoc;
  }

  // Верифікація access токену
  verifyAccessToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (error) {
      return null;
    }
  }

  // Верифікація refresh токену
  async verifyRefreshToken(token) {
    try {
      const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      const tokenDoc = await RefreshToken.findOne({ 
        token, 
        userId: payload.userId, 
        isActive: true 
      });
      
      return tokenDoc ? payload : null;
    } catch (error) {
      return null;
    }
  }

  // Видалення refresh токену
  async removeRefreshToken(token) {
    await RefreshToken.findOneAndUpdate(
      { token },
      { isActive: false }
    );
  }

  // Генерація випадкового токену для email верифікації
  generateEmailVerificationToken() {
    return crypto.randomBytes(32).toString('hex');
  }
}

module.exports = new AuthService();