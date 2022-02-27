import axios from "axios";

const userToken = localStorage.getItem("confrenz-token");

const axiosInstance = axios.create({
  baseURL: "https://codeio-backend.herokuapp.com",
  headers: { Authorization: `Bearer ${userToken}` },
});

export default axiosInstance;
