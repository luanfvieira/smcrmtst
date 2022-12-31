export function formatFone(fone) {
  return fone
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d)(\d{4})$/, "$1-$2");
}
