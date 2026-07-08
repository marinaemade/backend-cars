import mongoose from "mongoose";

/* global process */

export async function connectDB() {
  if (!process.env.DB) {
    throw new Error("DB is required");
  }

  const connection = await mongoose.connect(process.env.DB);
  console.log(`MongoDB connected: ${connection.connection.host}`);
}
