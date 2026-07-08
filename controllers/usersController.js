import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { getNextId } from "../utils/nextId.js";
import { generateAccessToken } from "../utils/jwt.js";

function buildAuthResponse(user) {
  return {
    token: generateAccessToken(user),
    user,
  };
}

function pickUserUpdates(body, isAdmin) {
  const allowedFields = isAdmin
    ? [
        "name",
        "email",
        "password",
        "phone",
        "address",
        "role",
        "joinDate",
        "totalBookings",
        "status",
      ]
    : ["name", "email", "password", "phone", "address"];

  return Object.fromEntries(
    Object.entries(body).filter(([key]) => allowedFields.includes(key)),
  );
}

function pickRegistrationFields(body) {
  return Object.fromEntries(
    Object.entries(body).filter(([key]) =>
      ["name", "email", "password", "phone", "address"].includes(key),
    ),
  );
}

export async function registerUser(req, res, next) {
  try {
    const password = req.body.password?.trim();

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const registrationData = pickRegistrationFields(req.body);
    const user = await User.create({
      ...registrationData,
      id: await getNextId(User, "U"),
      password: hashedPassword,
      role: "user",
    });

    res.status(201).json(buildAuthResponse(user));
  } catch (error) {
    next(error);
  }
}

export async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json(buildAuthResponse(user));
  } catch (error) {
    next(error);
  }
}

export async function getUsers(req, res, next) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

export async function getUserById(req, res, next) {
  try {
    if (req.user.role !== "admin" && req.user.id !== req.params.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const user = await User.findOne({ id: req.params.id });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function updateUser(req, res, next) {
  try {
    const isAdmin = req.user.role === "admin";

    if (!isAdmin && req.user.id !== req.params.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const updates = pickUserUpdates(req.body, isAdmin);

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const user = await User.findOneAndUpdate(
      { id: req.params.id },
      { $set: { ...updates, id: req.params.id } },
      { returnDocument: "after", runValidators: true },
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const user = await User.findOneAndDelete({ id: req.params.id });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function getCurrentUser(req, res) {
  res.json(req.user);
}
