import Booking from "../models/Booking.js";
import { getNextId } from "../utils/nextId.js";

function canAccessBooking(user, booking) {
  return user.role === "admin" || booking.customerId === user.id;
}

export async function createBooking(req, res, next) {
  try {
    const isAdmin = req.user.role === "admin";
    const booking = await Booking.create({
      ...req.body,
      id: await getNextId(Booking, "BK"),
      customerId: isAdmin ? (req.body.customerId ?? req.user.id) : req.user.id,
      customerName: isAdmin ? (req.body.customerName ?? req.user.name) : req.user.name,
    });
    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
}

export async function getBookings(req, res, next) {
  try {
    const filters = req.user.role === "admin" ? {} : { customerId: req.user.id };
    const bookings = await Booking.find(filters);
    res.json(bookings);
  } catch (error) {
    next(error);
  }
}

export async function getBookingById(req, res, next) {
  try {
    const booking = await Booking.findOne({ id: req.params.id });
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (!canAccessBooking(req.user, booking)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    res.json(booking);
  } catch (error) {
    next(error);
  }
}

export async function updateBooking(req, res, next) {
  try {
    const existingBooking = await Booking.findOne({ id: req.params.id });

    if (!existingBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (!canAccessBooking(req.user, existingBooking)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const updates =
      req.user.role === "admin"
        ? req.body
        : {
            ...req.body,
            customerId: existingBooking.customerId,
            customerName: existingBooking.customerName,
          };

    const booking = await Booking.findOneAndUpdate(
      { id: req.params.id },
      { $set: { ...updates, id: req.params.id } },
      { returnDocument: "after", runValidators: true },
    );
    res.json(booking);
  } catch (error) {
    next(error);
  }
}
