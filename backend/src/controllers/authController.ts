const argon2 = require("argon2");

const User = require("../models/User");
const Workspace = require("../models/Workspace");

const { createSession, deleteSession } = require("../utils/session");

// ========================================
// Signup
// ========================================

const signup = async (req: any, res: any): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // ----------------------------------------
    // Validate required fields
    // ----------------------------------------

    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });

      return;
    }

    // ----------------------------------------
    // Normalize input
    // ----------------------------------------

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    // ----------------------------------------
    // Validate name
    // ----------------------------------------

    if (!normalizedName) {
      res.status(400).json({
        success: false,
        message: "Name cannot be empty",
      });

      return;
    }

    // ----------------------------------------
    // Validate email
    // ----------------------------------------

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });

      return;
    }

    // ----------------------------------------
    // Validate password
    // ----------------------------------------

    if (password.length < 8) {
      res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });

      return;
    }

    // ----------------------------------------
    // Check existing user
    // ----------------------------------------

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });

      return;
    }

    // ----------------------------------------
    // Hash password using Argon2id
    // ----------------------------------------

    const hashedPassword = await argon2.hash(password, {
      type: argon2.argon2id,
    });

    // ----------------------------------------
    // Create user
    // ----------------------------------------

    const user = await User.create({
      name: normalizedName,
      email: normalizedEmail,
      password: hashedPassword,
    });

    // ----------------------------------------
    // Create default workspace
    // ----------------------------------------

    await Workspace.create({
      name: "My Workspace",
      slug: `my-workspace-${user._id}`,
      ownerId: user._id,
      description: "",
      icon: "workspace",
    });

    // ----------------------------------------
    // Response
    // ----------------------------------------

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create account",
    });
  }
};

// ========================================
// Login
// ========================================

const login = async (req: any, res: any): Promise<void> => {
  try {
    const { email, password } = req.body;

    // ----------------------------------------
    // Validate required fields
    // ----------------------------------------

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Email and password are required",
      });

      return;
    }

    // ----------------------------------------
    // Normalize email
    // ----------------------------------------

    const normalizedEmail = email.trim().toLowerCase();

    // ----------------------------------------
    // Find user
    // ----------------------------------------

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });

      return;
    }

    // ----------------------------------------
    // Verify password
    // ----------------------------------------

    const passwordValid = await argon2.verify(user.password, password);

    if (!passwordValid) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });

      return;
    }

    // ----------------------------------------
    // Create session
    // ----------------------------------------

    await createSession(user._id, res);

    // ----------------------------------------
    // Response
    // ----------------------------------------

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};

// ========================================
// Get Current User
// ========================================

const me = async (req: any, res: any): Promise<void> => {
  try {
    const user = req.user;

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Get current user error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get current user",
    });
  }
};

// ========================================
// Logout
// ========================================

const logout = async (req: any, res: any): Promise<void> => {
  try {
    const sessionToken = req.cookies?.flowboard_session;

    // ----------------------------------------
    // Delete server-side session
    // ----------------------------------------

    if (sessionToken) {
      await deleteSession(sessionToken);
    }

    // ----------------------------------------
    // Clear session cookie
    // ----------------------------------------

    res.clearCookie("flowboard_session", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    // ----------------------------------------
    // Response
    // ----------------------------------------

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to logout",
    });
  }
};

// ========================================
// Exports
// ========================================

module.exports = {
  signup,
  login,
  me,
  logout,
};

export {};
