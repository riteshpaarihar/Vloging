// src/components/CallToAction.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CallToAction = () => (
  <div className="w-full bg-white py-12">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-center py-16 px-6 rounded-xl max-w-6xl mx-auto shadow-xl"
    >
      <h2 className="text-4xl font-extrabold mb-4">Start Sharing Your Story</h2>
      <p className="text-lg sm:text-xl mb-6 max-w-2xl mx-auto">
        Join thousands of creators and inspire the world with your vlogs, experiences, and ideas.
      </p>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link
          to="/register"
          className="bg-white text-red-600 hover:text-pink-600 font-semibold px-8 py-3 rounded-full shadow-md transition-all duration-300"
        >
          Get Started
        </Link>
      </motion.div>
    </motion.div>
  </div>
);

export default CallToAction;
