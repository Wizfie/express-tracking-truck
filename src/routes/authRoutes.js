import express from "express";
import {
  registerValidator,
  loginValidator,
} from "../validator/authValidator.js";
import { validationResult } from "express-validator";
import AuthController from "../controller/authController.js";

class AuthRouter {
  // Static method untuk mengatur rute
  static setupRoutes() {
    const router = express.Router();

    // Rute untuk register
    router.post(
      "/register",
      registerValidator,
      this.handleValidationError,
      AuthController.register
    );

    // Rute untuk login
    router.post(
      "/login",
      loginValidator,
      this.handleValidationError,
      AuthController.login
    );

    // Rute untuk logout
    router.post("/logout", AuthController.logout);

    return router;
  }

  // Static method untuk menangani error validasi
  static handleValidationError(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    next();
  }
}

export default AuthRouter.setupRoutes();
