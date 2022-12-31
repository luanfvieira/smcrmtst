import { toast } from "react-toastify";

export const useNotification = () => {
  const notify = (message, type = "info", duration) => {
    const delay = duration || 5000;

    toast[type](message, {
      autoClose: delay,
      position: "top-right",
    });
  };

  return [notify];
};
