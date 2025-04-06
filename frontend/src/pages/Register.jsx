import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, UploadCloud } from "lucide-react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    document.title = "Register | VlogHub";
  }, []);

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  return (
    <div className="min-h-screen mt-16 bg-gradient-to-tr from-rose-700 via-pink-700 to-purple-800 flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white shadow-2xl rounded-2xl w-full max-w-2xl p-8 sm:p-10 mt-10"
      >
        <h2 className="text-3xl font-bold text-center text-pink-700 mb-6">Create Your Account</h2>

        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-20">
          <input
            type="text"
            placeholder="First Name"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            required
          />
          <input
            type="text"
            placeholder="Username"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 col-span-1 sm:col-span-2"
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            required
          />
          <input
            type="text"
            placeholder="Mobile Number"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            required
          />
          <div className="relative col-span-1 sm:col-span-2">
            <input
              type={showPassword ? "text" : "password"}
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
              <span className="text-sm text-pink-600">Upload Profile Image</span>
              <input type="file" className="hidden" onChange={handleImageChange} />
            </label>
            {profileImage && (
              <p className="text-sm text-gray-700 mt-2">Selected: {profileImage.name}</p>
            )}
          </div>

          <button
            type="submit"
            className="col-span-1 sm:col-span-2 mt-4 bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-semibold py-3 rounded-lg transition-all"
          >
            Register
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
