import { empty } from "./empty";

export function formatAlias(alias) {
  return empty(alias)
    ? "N/A"
    : `${alias.substring(0, 2)}-${alias.substring(2, 6)}`;
}
