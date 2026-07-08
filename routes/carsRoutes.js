import express from "express";
import {
  createCar,
  deleteCar,
  getCarById,
  getCars,
  updateCar,
} from "../controllers/carsController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getCars);
router.get("/:id", getCarById);
router.post("/", protect, authorize("admin"), createCar);
router.put("/:id", protect, authorize("admin"), updateCar);
router.delete("/:id", protect, authorize("admin"), deleteCar);

export default router;
