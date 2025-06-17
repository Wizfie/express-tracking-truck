import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();
import ChatModel from "../model/ChatModel.js";

class ChatService {
  static async sendMessage(senderId, receiverId, content) {
    const sender = await prisma.user.findUnique({ where: { id: senderId } });
    const receiver = await prisma.user.findUnique({
      where: { id: receiverId },
    });

    // Validasi jika sender dan receiver memiliki role yang sesuai
    if (
      (sender?.role === "ADMIN" && receiver?.role === "USER") ||
      (sender?.role === "USER" && receiver?.role === "ADMIN")
    ) {
      return await ChatModel.createMessage(senderId, receiverId, content);
    } else {
      throw new Error("Only ADMIN and USER can send messages.");
    }
  }

  static async getMessages(senderId, receiverId) {
    return prisma.message.findMany({
      where: {
        OR: [
          { senderId: senderId, receiverId: receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      },
      orderBy: { createdAt: "asc" },
    });
  }
}

export default ChatService;
