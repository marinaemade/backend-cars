import jwt from "jsonwebtoken";

/* global process */

function getJwtSecret() {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is required");
  }

  return process.env.JWT_SECRET;
}

export function generateAccessToken(user) {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    getJwtSecret(),
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    },
  );
}

export function verifyAccessToken(token) {
  return jwt.verify(token, getJwtSecret());
}
