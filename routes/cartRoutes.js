import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItem,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.post("/", addToCart);
router.get("/", getCart);
router.put("/:id", updateCartItem);
router.delete("/:id", removeFromCart);

export default router;
