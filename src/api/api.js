import axios from "axios";

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: "https://codeit-zogakzip-backend.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;