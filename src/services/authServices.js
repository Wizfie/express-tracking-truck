import bcrypt from "bcryptjs";
import { createUser, findUserByUsername } from "../model/userModel.js";
import { generateToken } from "../utils/jwt.js";

class AuthService {
  static async registerUser(data) {
    const { username, password } = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await findUserByUsername(username);

    if (existingUser) {
      throw new Error("Username sudah digunakan");
    }

    const newUser = await createUser({
      username,
      password: hashedPassword,
    });

    return {
      user: newUser,
    };
  }

  static async loginUser(data) {
    const { username, password } = data;

    const user = await findUserByUsername(username);
    if (!user) {
      throw new Error("Username atau password salah");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Username atau password salah");
    }

    const token = generateToken(user.id, user.username);
    return {
      user,
      token,
    };
  }
}

export default AuthService;
