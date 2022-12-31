export function formatNumber(number) {
  return Number.isNaN(Number(number))
    ? 0
    : new Intl.NumberFormat("pt-BR").format(number);
  // return number.toLocaleString(undefined, { minimumFractionDigits: 2 });
  // return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
