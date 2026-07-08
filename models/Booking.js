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

const bookingSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true, index: true },
    carId: { type: String, required: true },
    carName: String,
    customerName: String,
    customerId: { type: String, required: true, index: true },
    driverId: String,
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, default: "Pending", index: true },
    paymentMethod: String,
  },
  schemaOptions,
);

export default mongoose.model("Booking", bookingSchema);
