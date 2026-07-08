import CartItem from "../models/CartItem.js";
import { getNextId } from "../utils/nextId.js";

function canAccessCartItem(user, cartItem) {
  return user.role === "admin" || cartItem.userId === user.id;
}

export async function addToCart(req, res, next) {
  try {
    const isAdmin = req.user.role === "admin";
    const item = await CartItem.create({
      ...req.body,
      id: await getNextId(CartItem, "CART"),
      userId: isAdmin ? (req.body.userId ?? req.user.id) : req.user.id,
    });
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
}

export async function getCart(req, res, next) {
  try {
    const filters =
      req.user.role === "admin"
        ? req.query.userId
          ? { userId: req.query.userId }
          : {}
        : { userId: req.user.id };
    const items = await CartItem.find(filters);
    res.json(items);
  } catch (error) {
    next(error);
  }
}

export async function updateCartItem(req, res, next) {
  try {
    const existingItem = await CartItem.findOne({ id: req.params.id });

    if (!existingItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    if (!canAccessCartItem(req.user, existingItem)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const updates =
      req.user.role === "admin"
        ? req.body
        : {
            ...req.body,
            userId: existingItem.userId,
          };

    const item = await CartItem.findOneAndUpdate(
      { id: req.params.id },
      { $set: { ...updates, id: req.params.id } },
      { returnDocument: "after", runValidators: true },
    );
    res.json(item);
  } catch (error) {
    next(error);
  }
}

export async function removeFromCart(req, res, next) {
  try {
    const item = await CartItem.findOne({ id: req.params.id });
    if (!item) return res.status(404).json({ message: "Cart item not found" });
    if (!canAccessCartItem(req.user, item)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await CartItem.deleteOne({ id: req.params.id });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
