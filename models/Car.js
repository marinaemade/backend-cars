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

const carSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true, index: true },
    brand: { type: String, required: true, index: true },
    model: { type: String, required: true },
    category: { type: String, index: true },
    price: { type: Number, required: true },
    rating: Number,
    reviews: Number,
    location: String,
    year: Number,
    transmission: String,
    fuelType: String,
    seats: Number,
    image: String,
    available: { type: Boolean, default: true, index: true },
    features: [String],
    description: String,
    engine: String,
    horsepower: Number,
    torque: Number,
    acceleration: String,
    topSpeed: Number,
    fuelConsumption: String,
    warranty: String,
  },
  schemaOptions,
);

export default mongoose.model("Car", carSchema);
