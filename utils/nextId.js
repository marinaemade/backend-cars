export async function getNextId(Model, prefix = "") {
  const docs = await Model.find({}, { id: 1 }).lean();

  const max = docs.reduce((highest, doc) => {
    const digits = String(doc.id ?? "").match(/\d+/g)?.join("");
    const value = digits ? Number(digits) : Number(doc.id);
    return Number.isFinite(value) ? Math.max(highest, value) : highest;
  }, 0);

  const next = max + 1;
  return prefix ? `${prefix}-${next}` : String(next);
}
