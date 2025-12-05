// =============================
// src/loaders/express.js
// =============================

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
import logger from "../utils/logger.js";
import { globalRateLimiter, loginRateLimiter } from "../middlewares/rateLimiter.js";
// import routes from "../api/routes/index.js";
// import { prefix } from "../../config/index.js";
import authRoutes from "../routes/auth.route.js";
import userRoutes from "../routes/user.route.js"
import spotRoutes from '../routes/spot.route.js'


export default (app) => {
  // Handle global application-level errors
  process.on("uncaughtException", (error) => {
    logger.error({
      code: "00001",
      message: error.message,
      type: "Uncaught Exception",
      stack: error.stack,
    });
  });

  process.on("unhandledRejection", (reason) => {
    logger.error({
      code: "00002",
      message: reason.message || reason,
      type: "Unhandled Rejection",
    });
  });

  // Base middlewares
//   app.enable("trust proxy");
  dotenv.config();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(helmet());
  app.use(compression());
  app.use(express.static("public"));
  app.disable("x-powered-by");
  app.disable("etag");

  // Global rate limiter
  app.use(globalRateLimiter);
  // Example for login endpoint rate limiting:
  // app.post("/auth/login", loginRateLimiter, authController.login);

  // Morgan → Winston integration
  app.use(
    morgan("combined", {
      stream: {
        write: (message) => logger.info(message.trim()),
      },
    })
  );

  // =============================
  // Health Check / Default Route
  // =============================
  app.get("/", (_req, res) => {
    res.status(200).json({
      resultMessage: { en: "Project is successfully working..." },
      resultCode: "00004",
    });
  });

  // =============================
  // Routes
  // =============================
  // app.use(prefix, routes);
  app.use("/api/auth", authRoutes);
  app.use("/api/user", userRoutes);
  app.use('/api/spot', spotRoutes);
  // =============================
  // 404 Handler
  // =============================
  app.use((req, res, next) => {
    const error = new Error("Endpoint could not be found!");
    error.status = 404;
    next(error);
  });

  // =============================
  // Central Error Handler
  // =============================
  app.use((error, req, res, _next) => {
    const status = error.status || 500;
    const resultCode =
      status === 404 ? "00014" : status === 500 ? "00013" : "00015";

    logger.error({
      message: error.message,
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
      status,
      stack: error.stack,
    });

    res.status(status).json({
      resultMessage: { en: error.message },
      resultCode,
    });
  });
};
