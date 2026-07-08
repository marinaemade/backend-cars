import Car from "../models/Car.js";
import { buildFilters } from "../utils/filters.js";
import { getNextId } from "../utils/nextId.js";

export async function createCar(req, res, next) {
  try {
    const car = await Car.create({
      ...req.body,
      id: req.body.id ?? (await getNextId(Car)),
    });
    res.status(201).json(car);
  } catch (error) {
    next(error);
  }
}

export async function getCars(req, res, next) {
  try {
    const cars = await Car.find(buildFilters(req.query));
    res.json(cars);
  } catch (error) {
    next(error);
  }
}

export async function getCarById(req, res, next) {
  try {
    const car = await Car.findOne({ id: req.params.id });
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (error) {
    next(error);
  }
}

export async function updateCar(req, res, next) {
  try {
    const car = await Car.findOneAndUpdate(
      { id: req.params.id },
      { $set: { ...req.body, id: req.params.id } },
      { returnDocument: "after", runValidators: true },
    );
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (error) {
    next(error);
  }
}

export async function deleteCar(req, res, next) {
  try {
    const car = await Car.findOneAndDelete({ id: req.params.id });
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
