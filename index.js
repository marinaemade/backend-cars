import cors from "cors";
import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import bookingsRoutes from "./routes/bookingsRoutes.js";
import carsRoutes from "./routes/carsRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import driversRoutes from "./routes/driversRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";

/* global process */

const app = express();
const PORT = process.env.PORT || 5001;
const DB = process.env.DB;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Car rental API is running",
    structure: "MVC",
    endpoints: [
      "/users/register",
      "/users/login",
      "/users/me",
      "/users",
      "/cars",
      "/bookings",
      "/drivers",
      "/cart",
    ],
  });
});

app.use("/users", usersRoutes);
app.use("/cars", carsRoutes);
app.use("/bookings", bookingsRoutes);
app.use("/drivers", driversRoutes);
app.use("/cart", cartRoutes);

app.use(notFound);
app.use(errorHandler);

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

