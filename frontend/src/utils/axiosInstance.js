import axios from "axios";

const API_BASE_URL =
    import.meta.env.VITE_API_URL || "https://vloging-production.up.railway.app/api";
// import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    withCredentials: true, // Ensure credentials (cookies, etc.) are sent
});


// ✅ Automatically add the token to every request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // Retrieve token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Attach token
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;