import Driver from "../models/Driver.js";
import { getNextId } from "../utils/nextId.js";

export async function createDriver(req, res, next) {
  try {
    const driver = await Driver.create({
      ...req.body,
      id: req.body.id ?? (await getNextId(Driver, "D")),
    });
    res.status(201).json(driver);
  } catch (error) {
    next(error);
  }
}

export async function getDrivers(req, res, next) {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (error) {
    next(error);
  }
}

export async function getDriverById(req, res, next) {
  try {
    const driver = await Driver.findOne({ id: req.params.id });
    if (!driver) return res.status(404).json({ message: "Driver not found" });
    res.json(driver);
  } catch (error) {
    next(error);
  }
}

export async function updateDriver(req, res, next) {
  try {
    const driver = await Driver.findOneAndUpdate(
      { id: req.params.id },
      { $set: { ...req.body, id: req.params.id } },
      { returnDocument: "after", runValidators: true },
    );
    if (!driver) return res.status(404).json({ message: "Driver not found" });
    res.json(driver);
  } catch (error) {
    next(error);
  }
}

export async function deleteDriver(req, res, next) {
  try {
    const driver = await Driver.findOneAndDelete({ id: req.params.id });
    if (!driver) return res.status(404).json({ message: "Driver not found" });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
