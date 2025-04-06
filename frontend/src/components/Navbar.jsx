import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import useAuthStore from "../store/authStore"; // Zustand store

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuthStore(); // ✅ from Zustand store

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Posts", path: "/posts" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#1a1a1a]">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center border-b border-[#ff4d4d]">
        <Link to="/" className="text-2xl font-bold text-white">
          Vlog<span className="text-[#ff4d4d]">Space</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 text-white font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative px-3 py-2 transition duration-300 ${
                location.pathname === link.path
                  ? "text-[#ff4d4d] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#ff4d4d]"
                  : "hover:text-[#ff4d4d]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Auth */}
        {user ? (
          <div className="hidden md:flex items-center gap-4 text-white">
            <span className="text-[#ff4d4d] font-semibold">Hi, {user.firstName} 👋</span>
            <button
              onClick={logout}
              className="px-3 py-1 border border-white rounded-lg hover:bg-white hover:text-[#1a1a1a] transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="hidden md:flex space-x-3">
            <Link
              to="/login"
              className="px-4 py-2 border border-[#ff4d4d] text-[#ff4d4d] rounded-lg hover:bg-[#ff4d4d] hover:text-white transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-[#ff4d4d] text-white rounded-lg hover:bg-[#ff6666] transition"
            >
              Register
            </Link>
          </div>
        )}

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 z-40"
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Slide-In */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? "0%" : "100%" }}
        transition={{ type: "spring", stiffness: 80 }}
        className="fixed top-0 right-0 w-3/4 sm:w-1/2 h-full bg-[#1a1a1a] shadow-lg z-50 p-6 flex flex-col"
      >
        <button className="absolute top-4 right-4 text-white" onClick={toggleMenu}>
          <X size={28} />
        </button>

        <div className="mt-12 flex flex-col space-y-5 text-lg font-medium text-white">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`px-3 py-2 transition duration-300 ${
                location.pathname === link.path
                  ? "text-[#ff4d4d] font-semibold"
                  : "hover:text-[#ff4d4d]"
              }`}
              onClick={toggleMenu}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="mt-6 flex flex-col space-y-3">
          {user ? (
            <>
              <span className="text-[#ff4d4d] font-semibold text-center">
                Hi, {user.firstName} 👋
              </span>
              <button
                onClick={() => {
                  logout();
                  toggleMenu();
                }}
                className="px-4 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-[#1a1a1a] transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 border border-[#ff4d4d] text-[#ff4d4d] rounded-lg hover:bg-[#ff4d4d] hover:text-white transition"
                onClick={toggleMenu}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-[#ff4d4d] text-white rounded-lg hover:bg-[#ff6666] transition"
                onClick={toggleMenu}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
