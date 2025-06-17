import express from "express";
import ChatController from "../controller/chatController.js";
class ChatRoutes {
  static setupRoutes() {
    const router = express.Router();
    router.post("/send", ChatController.sendMessage);
    router.get("/history", ChatController.getMessages);
    return router;
  }
}

export default ChatRoutes.setupRoutes();
