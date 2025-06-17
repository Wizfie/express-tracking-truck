import UserService from "../services/userServices.js";

class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getMe(req, res) {
    try {
      const user = await UserService.getById(req.user.id);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAdmin(req, res) {
    try {
      const admin = await UserService.getAdmin();
      if (!admin) return res.status(404).json({ message: "Admin not found" });
      res.json(admin);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default UserController;
