import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUserAlt, FaLock } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    identifier: "", // email or mobile
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", loginData);
    // Add API call here
  };

  return (
    <>
      <Helmet>
        <title>Login - VlogHub</title>
        <meta
          name="description"
          content="Login to VlogHub to explore, engage and share your vlogs. Join the community today!"
        />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-rose-700 via-pink-700 to-purple-800 px-4 pt-20 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-center text-red-500 mb-2">Welcome Back</h2>
          <p className="text-center text-gray-500 mb-6">
            Login to continue your vlogging journey
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email or Mobile Input */}
            <div className="relative">
              <FaUserAlt className="absolute top-3.5 left-3 text-gray-400" />
              <input
                type="text"
                name="identifier"
                value={loginData.identifier}
                onChange={handleChange}
                placeholder="Email or Mobile Number"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <FaLock className="absolute top-3.5 left-3 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <span
                className="absolute right-3 top-3.5 text-gray-500 cursor-pointer"
                onClick={togglePassword}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Forgot Password */}
            <div className="text-right text-sm">
              <Link
                to="/forgot-password"
                className="text-rose-500 font-medium hover:underline transition"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-rose-500 hover:bg-rose-600 transition text-white font-semibold py-3 rounded-md"
            >
              Login
            </motion.button>
          </form>

          {/* Register Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-red-500 font-medium hover:underline">
              Register
            </Link>
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
