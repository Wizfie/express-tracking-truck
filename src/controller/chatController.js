import ChatService from "../services/chatServices.js";

class ChatController {
  static async sendMessage(req, res) {
    try {
      const { senderId, receiverId, content } = req.body;
      console.log("Sender ID:", senderId);
      console.log("Receiver ID:", receiverId);
      console.log("Content:", content);

      const message = await ChatService.sendMessage(
        senderId,
        receiverId,
        content
      );
      return res.status(201).json(message);
    } catch (err) {
      res.status(403).json({ message: err.message });
    }
  }

  static async getMessages(req, res) {
    try {
      const { senderId, receiverId } = req.query;
      const messages = await ChatService.getMessages(
        parseInt(senderId),
        parseInt(receiverId)
      );
      res.json(messages || []);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default ChatController;
