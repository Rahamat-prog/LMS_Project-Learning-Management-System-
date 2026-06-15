import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1";

// 
to sent req with the all credential like cookie and header we need to set withCredentials to true in the axios instance
const axiosInstance = axios.create();

axiosInstance.defaults.baseURL= BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;