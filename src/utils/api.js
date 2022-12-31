import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: import.meta.env.VITE_URL_SERVER,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!!error.response) {
      if (error.response.status >= 500) {
        toast.error(error.response.data.msg || "Erro não mapeado!", {
          autoClose: 4000,
          position: "top-right",
        });
      } else if (error.response.status === 429) {
        toast.warn("Limite de tentativas excedido!", {
          autoClose: 4000,
          position: "top-right",
        });
      } else if (error.response.status >= 400) {
        toast.warn(error.response.data.msg || "Motivo não mapeado!", {
          autoClose: 4000,
          position: "top-right",
        });
      } else if (error.response.status === 0) {
        toast.warn("Sem resposta do servidor!", {
          autoClose: 4000,
          position: "top-right",
        });
      }

      if (error.response.status === 401) {
        if (error.response.data.msg === "Não autorizado.") {
          localStorage.removeItem("@smart-posto:accessToken");

          // delete api.defaults.headers.common.Authorization;
          // return <Navigate to="/" />;
          return document.location.reload(true);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
