// src/components/Categories.jsx
import { motion } from "framer-motion";

const Categories = () => {
  const categories = [
    {
      name: "Travel",
      image:
        "https://images.pexels.com/photos/2440064/pexels-photo-2440064.jpeg",
    },
    {
      name: "Food",
      image:
        "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg",
    },
    {
      name: "Lifestyle",
      image:
        "https://images.pexels.com/photos/3758054/pexels-photo-3758054.jpeg",
    },
    {
      name: "Tech",
      image:
        "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg",
    },
  ];

  return (
    <div className="w-full bg-[#1a1a1a]">
      <div className="py-1 px-6 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-6 text-white"
        >
          Explore Categories
        </motion.h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              className="rounded-lg overflow-hidden shadow-lg cursor-pointer"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-40 object-cover"
                loading="lazy"
              />
              <div className="bg-[#121212] text-white py-2 text-center font-medium">
                {cat.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
