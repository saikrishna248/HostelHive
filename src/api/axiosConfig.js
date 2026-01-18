import axios from "axios";
import { store } from "../Redux/store";

const api = axios.create({
  baseURL: "https://localhost:44393/api/"
});

api.interceptors.request.use((config) => {

 // const token = localStorage.getItem("token");
 const token = store.getState().auth.token; // 🔥 Redux token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
