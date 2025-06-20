import axios from "axios";

const API_BASE_URL =
    // import.meta.env.VITE_API_URL || "https://vloging-production.up.railway.app/api";
    // import.meta.env.VITE_API_BASE_URL || "https://vloging.onrender.com/api";
    //console.log(import.meta.env.VITE_API_BASE_URL)
    import.meta.env.VITE_API_URL || "http://localhost:5000/api";
// ✅ GOOD PART
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json", // Better use JSON for API
    },
    withCredentials: true, // ✅ Keep this to send cookies
});

// ❌ REMOVE token attachment via header if relying only on cookies



export default axiosInstance;