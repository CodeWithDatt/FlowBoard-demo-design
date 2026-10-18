const express = require("express");

const {
  signup,
  login,
  me,
  logout,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ========================================
// Public Auth Routes
// ========================================

router.post("/signup", signup);

router.post("/login", login);

// ========================================
// Protected Auth Routes
// ========================================

router.get("/me", authMiddleware, me);

router.post("/logout", authMiddleware, logout);

module.exports = router;

export {};