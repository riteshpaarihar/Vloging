// src/components/Newsletter.jsx
import { motion } from "framer-motion";

const Newsletter = () => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="bg-[#1a1a1a] text-white py-14 px-6 mt-1 shadow-inner"
  >
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-4xl font-extrabold mb-4">Stay in the Loop</h2>
      <p className="text-gray-400 text-lg mb-8">
        Subscribe to get the latest vlogs and creator tips directly to your inbox.
      </p>

      <motion.form
        whileHover={{ scale: 1.01 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="px-5 py-3 rounded-full w-full sm:w-auto text-black focus:outline-none focus:ring-2 focus:ring-[#ff4d4d] transition-all duration-300"
        />
        <button
          type="submit"
          className="bg-[#ff4d4d] px-6 py-3 rounded-full font-semibold hover:bg-[#ff6666] transition-all duration-300"
        >
          Subscribe
        </button>
      </motion.form>
    </div>
  </motion.div>
);

export default Newsletter;
