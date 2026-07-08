import mongoose from "mongoose";

const schemaOptions = {
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.password;
      return ret;
    },
  },
};

const userSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true, select: false },
    phone: String,
    address: String,
    role: { type: String, enum: ["user", "admin"], default: "user" },
    joinDate: { type: String, default: () => new Date().toISOString().slice(0, 10) },
    totalBookings: { type: Number, default: 0 },
    status: { type: String, default: "Active" },
  },
  schemaOptions,
);

export default mongoose.model("User", userSchema);
