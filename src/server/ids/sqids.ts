import Sqids from "sqids";

const sqids = new Sqids({
  minLength: 7,
});

export function encodePublicId(value: number) {
  if (!Number.isInteger(value) || value < 0) {
    throw new Error("Public IDs can only be encoded from non-negative integers.");
  }

  return sqids.encode([value]);
}

export function decodePublicId(id: string) {
  if (!isPublicId(id)) {
    return null;
  }

  const values = sqids.decode(id);
  return values.length === 1 ? values[0] : null;
}

export function isPublicId(id: string) {
  return /^[A-Za-z0-9]{7,}$/.test(id);
}
