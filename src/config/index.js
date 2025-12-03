import { config } from "dotenv";
config();

const {
  DATABASE_URL,
  PORT,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
  BCRYPT_SALT_ROUNDS
} = process.env;

export const port = PORT || 3000;
export const dburi = DATABASE_URL;

export const jwtAccessSecret = JWT_ACCESS_SECRET;
export const jwtRefreshSecret = JWT_REFRESH_SECRET;
export const jwtAccessExpiresIn = JWT_ACCESS_EXPIRES_IN || "15m";
export const jwtRefreshExpiresIn = JWT_REFRESH_EXPIRES_IN || "7d";
export const bcryptSaltRounds = parseInt(BCRYPT_SALT_ROUNDS) || 12;
