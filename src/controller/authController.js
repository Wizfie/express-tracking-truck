import { blacklistToken, verifyToken } from "../utils/jwt.js";
import AuthService from "../services/authServices.js";
class AuthController {
  static async register(req, res) {
    const { username, password } = req.body;

    try {
      const { user } = await AuthService.registerUser({ username, password });
      res.status(201).json({
        message: "Pendaftaran Berhasil",
        user: {
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
      const { user, token } = await AuthService.loginUser({
        username,
        password,
      });
      // Set token as httpOnly cookie
      res.cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });
      res.status(200).json({
        message: "Login Berhasil",
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

  static async validateSession(req, res) {
    // Ambil token dari cookie httpOnly
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ valid: false, user: null });
    }
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ valid: false, user: null });
    }
    res.status(200).json({
      valid: true,
      user: { id: decoded.userId, username: decoded.username },
    });
  }

  static async logout(req, res) {
    const token =
      req.cookies.authToken || req.header("Authorization")?.split(" ")[1];
    blacklistToken(token);
    // Clear cookie
    res.clearCookie("authToken");
    res.status(200).json({
      message: "Logout Berhasil",
    });
  }
}

export default AuthController;
