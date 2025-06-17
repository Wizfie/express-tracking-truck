import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

class ChatModel {
  static async createMessage(senderId, receiverId, content) {
    try {
      console.log("Creating message with data:", senderId);
      console.log("Creating message with data:", receiverId);
      console.log("Creating message with data:", content);

      const newMessage = await prisma.message.create({
        data: {
          senderId,
          receiverId,
          content,
        },
      });
      return newMessage;
    } catch (error) {
      throw new Error("Failed to create message: " + error.message);
    }
  }
}

export default ChatModel;
