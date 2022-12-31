import { format, isValid } from "date-fns";

export function formatDate(data) {
  if (isValid(new Date(data))) {
    return format(new Date(data), "dd/MM/yyyy HH:mm:ss");
  } else {
    return "";
  }
}
