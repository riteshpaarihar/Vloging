import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { motion } from "framer-motion";

const footerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Footer = () => {
  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
      className="bg-[#1a1a1a] text-white px-6 py-10 "
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* About */}
        <motion.div whileHover={{ scale: 1.02 }}>
          <h3 className="text-xl font-semibold mb-4 text-[#ff4d4d]">VlogSpace</h3>
          <p className="text-sm text-gray-300">
            VlogSpace is your go-to platform for sharing stories, moments, and creativity with the world.
          </p>
        </motion.div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#ff4d4d]">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            {["Home", "About", "Posts", "Contact"].map((item, idx) => (
              <motion.li key={idx} whileHover={{ x: 5 }}>
                <Link
                  to={`/${item.toLowerCase()}`}
                  className="hover:text-[#ff4d4d] transition"
                >
                  {item}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <motion.div whileHover={{ scale: 1.02 }}>
          <h4 className="text-lg font-semibold mb-4 text-[#ff4d4d]">Contact Us</h4>
          <p className="text-sm text-gray-300">Email: support@vlogspace.com</p>
          <p className="text-sm text-gray-300">Phone: +91 98765 43210</p>
          <p className="text-sm text-gray-300">Address: New Delhi, India</p>
        </motion.div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#ff4d4d]">Follow Us</h4>
          <div className="flex space-x-4">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, idx) => (
              <motion.a
                key={idx}
                href="#"
                className="text-gray-300 hover:text-[#ff4d4d]"
                whileHover={{ scale: 1.2 }}
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-10 text-center text-sm text-gray-400 border-t border-gray-700 pt-4"
      >
        &copy; {new Date().getFullYear()} VlogSpace. All rights reserved.
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
