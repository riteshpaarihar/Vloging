// src/context/AuthProvider.jsx
import { useEffect } from "react";
import useAuthStore from "../store/authStore.js";

const AuthProvider = ({ children }) => {
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser(); // Fetch user data on mount
  }, [fetchUser]);

  return children;
};

export default AuthProvider;
