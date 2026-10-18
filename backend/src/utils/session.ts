const crypto = require("crypto");

const Session = require("../models/Session");
const User = require("../models/User");

const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

// ========================================
// Generate secure session token
// ========================================

const generateSessionToken = (): string => {
  return crypto.randomBytes(32).toString("hex");
};

// ========================================
// Hash session token
// ========================================

const hashSessionToken = (token: string): string => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

// ========================================
// Create session
// ========================================

const createSession = async (userId: any, res: any): Promise<string> => {
  const sessionToken = generateSessionToken();

  const tokenHash = hashSessionToken(sessionToken);

  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  await Session.create({
    userId,
    tokenHash,
    expiresAt,
  });

  res.cookie("flowboard_session", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });

  return sessionToken;
};

// ========================================
// Get session from token
// ========================================

const getSessionFromToken = async (
  sessionToken: string,
): Promise<any | null> => {
  if (!sessionToken) {
    return null;
  }

  const tokenHash = hashSessionToken(sessionToken);

  const session = await Session.findOne({
    tokenHash,
  });

  if (!session) {
    return null;
  }

  // Check session expiration
  if (session.expiresAt.getTime() <= Date.now()) {
    await Session.deleteOne({
      _id: session._id,
    });

    return null;
  }

  // Find the user associated with the session
  const user = await User.findById(session.userId).select("_id name email");

  if (!user) {
    await Session.deleteOne({
      _id: session._id,
    });

    return null;
  }

  return {
    session,
    user,
  };
};

// ========================================
// Delete session
// ========================================

const deleteSession = async (sessionToken: string): Promise<void> => {
  if (!sessionToken) {
    return;
  }

  const tokenHash = hashSessionToken(sessionToken);

  await Session.deleteOne({
    tokenHash,
  });
};

// ========================================
// Export
// ========================================

module.exports = {
  generateSessionToken,
  hashSessionToken,
  createSession,
  getSessionFromToken,
  deleteSession,
};

export {};
