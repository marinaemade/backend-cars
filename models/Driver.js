import mongoose from "mongoose";

const schemaOptions = {
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: (doc, ret) => {
      delete ret._id;
      return ret;
    },
  },
};

const driverSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true, index: true },
    name: { type: String, required: true },
    phone: String,
    license: String,
    status: { type: String, default: "Available", index: true },
    rating: Number,
    experience: String,
    totalTrips: { type: Number, default: 0 },
    joinDate: { type: String, default: () => new Date().toISOString().slice(0, 10) },
  },
  schemaOptions,
);

export default mongoose.model("Driver", driverSchema);
