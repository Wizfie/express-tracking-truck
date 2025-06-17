import { Server } from "socket.io";

let ioInstance;
const userSockets = {}; // To store socket IDs for each user

export function setupSocket(server) {
  ioInstance = new Server(server, {
    cors: {
      origin: ["http://localhost:5173"], // Adjust this to your frontend URL
      credentials: true,
    },
  });

  ioInstance.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Register user socket with userId
    socket.on("register", (userId) => {
      console.log("User registered with ID:", userId); // Log to see the registered user ID
      userSockets[userId] = socket.id; // Associate socket.id with the userId
      socket.userId = userId; // Store userId on the socket
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
      console.log(
        "Sending private message to:",
        to,
        "from:",
        from,
        "message:",
        message
      );
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      if (socket.userId) delete userSockets[socket.userId]; // Clean up the socketId on disconnect
    });
  });
}

export function getIO() {
  return ioInstance;
}
