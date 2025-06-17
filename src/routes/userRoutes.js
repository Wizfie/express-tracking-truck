import express from "express";
import UserController from "../controller/userController.js";
import { verifyAuth } from "../utils/jwt.js";

class UserRoutes {
  static setupRoutes() {
    const router = express.Router();
    router.get("/all", UserController.getAllUsers);
    router.get("/me", verifyAuth, UserController.getMe);
    router.get("/admin", verifyAuth, UserController.getAdmin);
    return router;
  }
}

export default UserRoutes.setupRoutes();
