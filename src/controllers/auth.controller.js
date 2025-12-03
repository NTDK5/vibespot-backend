// src/controllers/auth.controller.js
import { loginUser, refreshToken, logout } from "../services/auth.service.js";
import prisma from "../loaders/prisma.js";

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await loginUser({ email, password });

    // send tokens. Access token in body; refresh token as httpOnly cookie recommended.
    // Example: set refresh token as cookie (recommended)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    res.json({ user, accessToken });
  } catch (err) {
    next(err);
  }
};

export const refreshController = async (req, res, next) => {
  try {
    // prefer cookie, but support body
    const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
    const { user, accessToken, refreshToken: newRefreshToken } = await refreshToken(refreshToken);

    // rotate cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.json({ user, accessToken });
  } catch (err) {
    next(err);
  }
};

export const logoutController = async (req, res, next) => {
  try {
    // If you store userId in req.user via auth middleware:
    const userId = req.user?.sub || req.body?.userId;
    if (userId) {
      await logout(userId);
    }

    // clear cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.json({ message: "Logged out" });
  } catch (err) {
    next(err);
  }
};
