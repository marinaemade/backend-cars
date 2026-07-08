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

const cartItemSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true, index: true },
    userId: { type: String, required: true, index: true },
    carId: { type: String, required: true, index: true },
    startDate: String,
    endDate: String,
    totalPrice: Number,
    driverId: String,
  },
  schemaOptions,
);

export default mongoose.model("CartItem", cartItemSchema);
