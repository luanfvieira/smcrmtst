import { empty } from "./empty";

export function formatAliasClient(alias) {
  return empty(alias)
    ? "N/A"
    : `${alias.substring(0, 6)}-${alias.substring(6)}`;
}
