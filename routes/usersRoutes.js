import express from "express";
import {
  deleteUser,
  getCurrentUser,
  getUserById,
  getUsers,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/usersController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getCurrentUser);
router.get("/", protect, authorize("admin"), getUsers);
router.get("/:id", protect, getUserById);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, authorize("admin"), deleteUser);

export default router;
