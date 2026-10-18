const { getSessionFromToken } = require("../utils/session");

const authMiddleware = async (req: any, res: any, next: any): Promise<void> => {
  try {
    const sessionToken = req.cookies?.flowboard_session;

    if (!sessionToken) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });

      return;
    }

    const sessionData = await getSessionFromToken(sessionToken);

    if (!sessionData) {
      res.status(401).json({
        success: false,
        message: "Invalid or expired session",
      });

      return;
    }

    req.user = sessionData.user;
    req.session = sessionData.session;

    next();
  } catch (error) {
    console.error("Authentication middleware error:", error);

    res.status(500).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

module.exports = authMiddleware;

export {};
