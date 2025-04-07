import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Eye, EyeOff, UploadCloud } from "lucide-react";
import { registerUser } from "../features/auth/authThunks.js";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    mobileNumber: "",
    password: "",
  });

  useEffect(() => {
    document.title = "Register | VlogHub";
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    for (let key in formData) {
      form.append(key, formData[key]);
    }
    if (profileImage) {
      form.append("profileImage", profileImage);
    }

    try {
      const res = await dispatch(registerUser(form)).unwrap(); // to get payload

      toast.success("Registration successful!");
      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        mobileNumber: "",
        password: "",
      });
      setProfileImage(null);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Registration failed:", err);
      // error toast already handled in useEffect
    }
  };

  return (
    <div className="min-h-screen mt-16 bg-gradient-to-tr from-rose-700 via-pink-700 to-purple-800 flex items-center justify-center px-4 py-10">
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white shadow-2xl rounded-2xl w-full max-w-2xl p-8 sm:p-10 mt-10"
      >
        <h2 className="text-3xl font-bold text-center text-pink-700 mb-6">
          Create Your Account
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-20"
        >
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            required
          />
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            required
          />
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 col-span-1 sm:col-span-2"
            required
          />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            required
          />
          <input
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="Mobile Number"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            required
          />
          <div className="relative col-span-1 sm:col-span-2">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
              required
            />
            <span
              className="absolute right-4 top-3 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </span>
          </div>

          <div className="col-span-1 sm:col-span-2">
            <label className="flex flex-col items-center justify-center px-4 py-3 border-2 border-dashed border-pink-500 rounded-lg cursor-pointer hover:bg-pink-50 transition">
              <UploadCloud className="w-6 h-6 text-pink-600 mb-1" />
              <span className="text-sm text-pink-600">
                Upload Profile Image
              </span>
              <input
                type="file"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            {profileImage && (
              <p className="text-sm text-gray-700 mt-2">
                Selected: {profileImage.name}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="col-span-1 sm:col-span-2 mt-4 bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-semibold py-3 rounded-lg transition-all"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm mt-5">
          Already have an account?{" "}
          <a href="/login" className="text-pink-600 hover:underline font-medium">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
