import axios from "axios";

const notificationsApi = axios.create({
  baseURL: import.meta.env.VITE_URL_SERVER,
});

export default notificationsApi;
