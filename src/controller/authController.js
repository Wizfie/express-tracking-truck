import { blacklistToken } from "../utils/jwt.js";
import AuthService from "../services/authServices.js";

class AuthController {
  static async register(req, res) {
    const { username, password } = req.body;

    try {
      const { user, token } = await AuthService.registerUser(
        username,
        password
      );
      res.status(201).json({
        message: "Pendaftaran Berhasil",
        user: {
          id: user.id,
          username: user.username,
        },
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  }

  static async login(req, res) {
    const { username, password } = req.body;

    try {
      const { user, token } = await AuthService.loginUser(username, password);
      res.status(200).json({
        message: "Login Berhasil",
        token: token,
        user: {
          id: user.id,
          username: user.username,
        },
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  }

  static async logout(req, res) {
    const token = req.header("Authorization")?.split(" ")[1];
    blacklistToken(token);
    res.status(200).json({
      message: "Logout Berhasil",
    });
  }
}

export default AuthController;
