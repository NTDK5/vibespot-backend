import rateLimit from 'express-rate-limit';
import logger from '../utils/logger.js';

// Global API limiter
export const globalRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 200,             // 200 requests per minute
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn({
      message: `Rate limit exceeded`,
      ip: req.ip,
      route: req.originalUrl,
      status: 429
    });

    return res.status(429).json({
      resultMessage: { en: 'Too many requests, please try later.' },
      resultCode: '00024'
    });
  }
});

// Login route limiter (more strict)
export const loginRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,               // 5 requests per minute
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn({
      message: `Login rate limit exceeded`,
      ip: req.ip,
      route: req.originalUrl,
      status: 429
    });

    return res.status(429).json({
      resultMessage: { en: 'Too many login attempts, try again later.' },
      resultCode: '00024'
    });
  }
});
