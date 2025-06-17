import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import { clearBlackList } from "./utils/jwt.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import pushRoutes from "./routes/pushRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import { createServer } from "http";
import { setupSocket } from "./utils/socket.js";
dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());

// Dynamic CORS origin and cookie settings based on environment
const isProduction = process.env.NODE_ENV === "production";
const allowedOrigins = isProduction
  ? [process.env.FRONTEND_URL] // Set FRONTEND_URL in .env for production
  : ["http://localhost:5173", `http://${process.env.DEV_HOST}:5173`];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use((req, res, next) => {
  if (req.path.startsWith("/api/auth/login")) {
    console.log("[LOGIN REQUEST]", {
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
      origin: req.headers.origin,
      host: req.headers.host,
      userAgent: req.headers["user-agent"],
      body: req.body,
    });
  }
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/vehicle", vehicleRoutes);
app.use("/api/trip", tripRoutes);
app.use("/api/location", locationRoutes);
app.use("/api", pushRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

const httpServer = createServer(app);
setupSocket(httpServer);

clearBlackList(); // Start the blacklist clearing process
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
