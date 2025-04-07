import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice.js"; // Redux slice

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
 // console.log("👤 Navbar user:", user);
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
            <div className="flex items-center gap-2">
              <img
                src={user.profileImage || "/default-avatar.png"}
                alt="profile"
                className="w-8 h-8 rounded-full object-cover border border-white"
              />
             {/* <span className="text-[#ff4d4d] font-medium">Hi, {user.firstName}</span> */}
             <motion.span
      className="text-[#ff4d4d] font-medium"
      initial={{ width: 0 }}
      animate={{ width: "auto" }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
    {user.firstName}
    </motion.span>
            </div>
            <button
              onClick={() => dispatch(logout())}
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
              <div className="flex items-center gap-3 justify-center mb-2">
                <img
                  src={user.profileImage || "/https://res.cloudinary.com/dexfdwvgf/image/upload/v1744011946/vlogging_users/jpjfckppxi1efpbt2ah8.webp"}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover border border-white"
                />
                <span className="text-[#ff4d4d] font-medium text-lg">
                  Hi, {user.firstName}
                </span>
              </div>
              <button
                onClick={() => {
                  dispatch(logout());
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
