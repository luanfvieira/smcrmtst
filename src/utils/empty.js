export function empty(item) {
  if (["null", "undefined", null, undefined].includes(item)) {
    return true;
  }
  if (Array.isArray(item)) {
    return item.length === 0;
  }
  if (typeof item === "string") {
    return item.trim() === "";
  }
  if (typeof item === "object") {
    return Object.keys(item).length === 0;
  }
  return null;
}
