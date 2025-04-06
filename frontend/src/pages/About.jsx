// src/pages/About.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-gray-100 text-gray-800 mt-6">
      {/* Hero */}
      <section className="bg-white py-16 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-bold mb-4"
        >
          About VlogVerse
        </motion.h1>
        <p className="text-lg sm:text-xl max-w-2xl mx-auto">
          Empowering creators to share stories and connect with the world.
        </p>
      </section>

      {/* Mission */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.img
            src="https://images.pexels.com/photos/4877857/pexels-photo-4877857.jpeg"
            alt="Our Mission"
            className="w-full rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            loading="lazy"
          />
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700">
              We aim to create a supportive space where vloggers can express themselves, reach wider audiences,
              and grow their influence while connecting with like-minded creators and fans.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="bg-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">What We Offer</h2>
          <div className="grid sm:grid-cols-3 gap-8 text-left">
            {[
              { title: "Creator Tools", desc: "Custom profiles, vlog uploads, and analytics to track your growth." },
              { title: "Engaging Community", desc: "Connect with viewers and fellow vloggers in real time." },
              { title: "Monetization Support", desc: "Resources and tools to help you grow and earn." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Creator */}
      <section className="py-12 px-6 max-w-4xl mx-auto text-center">
        <img
          src="https://images.pexels.com/photos/2380794/pexels-photo-2380794.jpeg"
          alt="Founder"
          className="w-32 h-32 object-cover rounded-full mx-auto mb-4 shadow-lg"
        />
        <h3 className="text-2xl font-semibold">Ritesh Singh</h3>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto">
          “I started VlogVerse to give a voice to everyday storytellers. Everyone has a story worth sharing — and we help you share it beautifully.”
        </p>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-center py-16 px-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Ready to Share Your Journey?</h2>
        <p className="text-lg sm:text-xl mb-6 max-w-2xl mx-auto">
          Sign up and start creating your first vlog today.
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/register"
            className="bg-white text-red-600 font-semibold px-8 py-3 rounded-full shadow-lg hover:text-pink-600 transition"
          >
            Get Started
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
