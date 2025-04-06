import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Instagram,
  Twitter,
  Youtube,
  Users2,
  Handshake,
} from "lucide-react";

const Contact = () => {
  return (
    <div className="bg-white w-full mt-16"> {/* Top margin added here */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto py-16 px-6 text-gray-800"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Get in Touch
        </h2>
        <p className="text-center text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Have questions, suggestions, or just want to say hi? We’d love to hear from you!
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <form className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-red-500 hover:bg-pink-500 text-white font-semibold px-6 py-3 rounded-full transition"
            >
              Send Message
            </motion.button>
          </form>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <Users2 className="text-pink-600 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-1">Customer Support</h3>
                <p className="text-gray-600">
                  Have issues or need help with your account? Reach out anytime.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Handshake className="text-pink-600 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-1">Business Inquiries</h3>
                <p className="text-gray-600">
                  Want to collaborate, sponsor, or feature your brand? We're open to creative partnerships.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="text-pink-600 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-1">Email Us</h3>
                <p className="text-gray-600">support@vloghub.com</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
              <div className="flex gap-6 text-pink-600 text-xl">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <Youtube />
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
