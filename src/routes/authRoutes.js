import express from "express";
import {
  registerValidator,
  loginValidator,
} from "../validator/authValidator.js";
import handleValidationError from "../validator/handleValidator.js";
import AuthController from "../controller/authController.js";

class AuthRouter {
  // Static method untuk mengatur rute
  static setupRoutes() {
    const router = express.Router();

    // Rute untuk register
    router.post(
      "/register",
      registerValidator,
      handleValidationError,
      AuthController.register
    );

    // Rute untuk login
    router.post(
      "/login",
      loginValidator,
      handleValidationError,
      AuthController.login
    );

    // Rute untuk logout
    router.post("/logout", AuthController.logout);

    // Rute untuk validasi session
    router.get("/validate", AuthController.validateSession);

    return router;
  }
}

export default AuthRouter.setupRoutes();
