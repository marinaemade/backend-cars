import express from "express";
import {
  createDriver,
  deleteDriver,
  getDriverById,
  getDrivers,
  updateDriver,
} from "../controllers/driversController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getDrivers);
router.get("/:id", getDriverById);
router.post("/", protect, authorize("admin"), createDriver);
router.put("/:id", protect, authorize("admin"), updateDriver);
router.delete("/:id", protect, authorize("admin"), deleteDriver);

export default router;
