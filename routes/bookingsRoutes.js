import express from "express";
import {
  createBooking,
  getBookingById,
  getBookings,
  updateBooking,
} from "../controllers/bookingsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.post("/", createBooking);
router.get("/", getBookings);
router.get("/:id", getBookingById);
router.put("/:id", updateBooking);

export default router;
