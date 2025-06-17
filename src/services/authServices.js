import bcrypt from "bcryptjs";
import UserModel from "../model/userModel.js";
import { generateToken } from "../utils/jwt.js";

class AuthService {
  static async registerUser(data) {
    const { username, password, role } = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await UserModel.findUserByUsername(username);

    if (existingUser) {
      throw new Error("Username sudah digunakan");
    }

    const newUser = await UserModel.createUser({
      username,
      password: hashedPassword,
      role,
    });

    return {
      user: newUser,
    };
  }

  static async loginUser(data) {
    const { username, password } = data;

    const user = await UserModel.findUserByUsername(username);
    if (!user) {
      throw new Error("Username atau password salah");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Username atau password salah");
    }

    const token = generateToken(
      user.id,
      user.username,
      user.role,
      user.company
    );
    return {
      user,
      token,
    };
  }
}

export default AuthService;
