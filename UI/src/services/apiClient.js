import axios from "axios";
import store from "../store";

const API_BASE_URL = '/mallassistant/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
    const token = store.getState().auth.token; // in-memory only
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default apiClient;
