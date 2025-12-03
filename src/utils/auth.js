import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from 'crypto';
import { jwtAccessSecret, jwtRefreshSecret, jwtAccessExpiresIn, jwtRefreshExpiresIn, bcryptSaltRounds } from "../config/index.js";

// const {
//     JWT_ACESS_TOKEN_SECRET,
//     JWT_REFRESH_TOKEN_SECRET,
//     JWT_ACCESS_EXPIRES_IN = "15m",
//     JWT_REFRESH_EXPIRES_IN = "7d",
//     BCRYPT_SALT_ROUNDS = 12,
// } = process.env;


export const hashPassword = async (plainPassword) =>{
    const rounds = Number(bcryptSaltRounds) || 12;
    return bcrypt.hash(plainPassword, rounds)
};

export const comparePassword = async (plain, hash) => {
    return bcrypt.compare(plain, hash);
};

export const signAccessToken = (payload) =>{
    return jwt.sign(payload, jwtAccessSecret, {
        expiresIn: jwtAccessExpiresIn
    });
};

export const verifyAccesssToken = (token) => {
    return jwt.verify(token, JWT_ACESS_TOKEN_SECRET);
}

export const signRefreshToken = () =>{
    return crypto.randomBytes(64).toString("hex");
}

export const hashRefreshToken = (token) => {
    return crypto.createHash("sha256").update(token).digest("hex");
};