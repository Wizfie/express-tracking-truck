import { Server } from "socket.io";

let ioInstance;
const userSockets = {}; // To store socket IDs for each user

export function setupSocket(server) {
  // Setup Socket.IO with CORS configuration
  ioInstance = new Server(server, {
    cors: {
      origin: "http://localhost:5173" || process.env.FRONTEND_URL, // Allow only the frontend domain
      methods: ["GET", "POST"], // Allowed HTTP methods
      credentials: true, // Allow cookies to be sent with WebSocket connections
    },
  });

  ioInstance.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Register user socket with userId
    socket.on("register", (userId) => {
      userSockets[userId] = socket.id; // Associate socket.id with the userId
      socket.userId = userId; // Store userId on the socket
      console.log(`User registered: ${userId}`);
    });

    // Private message event
    // Retry logic if the receiver is not connected
    socket.on("private message", ({ to, message, from }) => {
      if (userSockets[to]) {
        ioInstance.to(userSockets[to]).emit("new_message", { from, message }); // Send message to the receiver
      } else {
        console.log("Receiver is not connected. Retrying in 5 seconds...");
        setTimeout(() => {
          if (userSockets[to]) {
            ioInstance
              .to(userSockets[to])
              .emit("new_message", { from, message });
            console.log("Message sent after retry.");
          } else {
            console.log("Receiver still not connected.");
          }
        }, 5000); // Retry after 5 seconds
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      if (socket.userId) delete userSockets[socket.userId]; // Clean up the socketId on disconnect
    });
  });
}

export function getIo() {
  if (!ioInstance) {
    throw new Error("Socket.io not initialized. Call setupSocket first.");
  }
  return ioInstance;
}
