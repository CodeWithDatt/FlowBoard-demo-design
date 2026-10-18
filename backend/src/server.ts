const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const connectDatabase = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const workspaceRoutes = require("./routes/workspaceRoutes");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// ========================================
// Middleware
// ========================================

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(cookieParser());

// ========================================
// Routes
// ========================================

app.use("/api/auth", authRoutes);

app.use("/api/workspaces", workspaceRoutes);

// ========================================
// Health Check
// ========================================

app.get("/", (_req: any, res: any) => {
  res.status(200).json({
    success: true,
    message: "FlowBoard API is running",
  });
});

// ========================================
// Start Server
// ========================================

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log("=================================");
      console.log("🚀 FlowBoard Backend Started");
      console.log(`🌐 Server: http://localhost:${PORT}`);
      console.log("=================================");
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error);
    process.exit(1);
  }
};

startServer();

export {};
