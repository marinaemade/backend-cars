function parseValue(value) {
  if (value === "true") return true;
  if (value === "false") return false;
  if (value !== "" && !Number.isNaN(Number(value))) return Number(value);
  return value;
}

export function buildFilters(query) {
  return Object.fromEntries(
    Object.entries(query)
      .filter(([, value]) => value !== undefined && value !== "")
      .map(([key, value]) => [key, parseValue(value)]),
  );
}
