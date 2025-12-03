import { Router } from "express";
import { loginController, refreshController, logoutController } from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.js";
import Joi from "joi";

const router = Router();

// simple Joi schemas inline
const loginSchema = Joi.object({ email: Joi.string().email().required(), password: Joi.string().required() });

router.post("/login", validate(loginSchema), loginController);
router.post("/refresh", refreshController); // cookie or body
router.post("/logout", logoutController);

export default router;