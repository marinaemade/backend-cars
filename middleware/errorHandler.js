export function notFound(req, res) {
  res.status(404).json({ message: "Route not found" });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(error, req, res, next) {
  if (error.code === 11000) {
    return res.status(409).json({
      message: "Duplicate value",
      fields: Object.keys(error.keyPattern ?? {}),
    });
  }

  if (error.name === "ValidationError" || error.name === "CastError") {
    return res.status(400).json({ message: error.message });
  }

  console.error(error);
  res.status(500).json({ message: "Internal server error" });
}
