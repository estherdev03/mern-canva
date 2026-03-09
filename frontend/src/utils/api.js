import axios from "axios";
export const API_BASE_URL = "http://localhost:5000";
const local_api = API_BASE_URL;
// const production_api = "";

const token = localStorage.getItem("canva_token");

const api = axios.create({
  baseURL: local_api,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
  withCredentials: true,
});

export default api;
