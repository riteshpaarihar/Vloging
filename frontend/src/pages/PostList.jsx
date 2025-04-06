// src/pages/PostList.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const posts = [
  {
    id: 1,
    title: "A Magical Journey Through Japan",
    excerpt: "Join me as I explore the cherry blossoms, temples, and street food of Japan.",
    image: "https://images.pexels.com/photos/16121690/pexels-photo-16121690.jpeg",
    category: "Travel",
    date: "April 1, 2025",
    author: "Ritesh Singh",
  },
  {
    id: 2,
    title: "5 Delicious Vegan Recipes",
    excerpt: "Quick, healthy, and super tasty dishes you can try at home today.",
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    category: "Food",
    date: "March 28, 2025",
    author: "Riya Sharma",
  },
  {
    id: 3,
    title: "How I Built My Vlog Studio on a Budget",
    excerpt: "Let me walk you through how I set up my home vlog studio with minimal gear.",
    image: "https://images.pexels.com/photos/3394657/pexels-photo-3394657.jpeg",
    category: "Tech",
    date: "March 20, 2025",
    author: "Aman Verma",
  },
];

const PostList = () => {
  return (
    <div className="bg-white text-gray-800 py-16 px-6 max-w-7xl mx-auto mt-10">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-10 text-center text-[#1a1a1a]"
      >
        Latest Vlogs & Stories
      </motion.h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-xl overflow-hidden shadow-md border"
          >
            <img src={post.image} alt={post.title} className="w-full h-56 object-cover" />
            <div className="p-4">
              <p className="text-sm text-[#ff4d4d] mb-1 font-medium">{post.category}</p>
            
              <h3 className="text-xl font-semibold mb-2 line-clamp-2">{post.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>By {post.author}</span>
                <span>{post.date}</span>
              </div>
              <Link
                to={`/posts/${post.id}`}
                className="inline-block mt-4 text-[#ff4d4d] font-semibold hover:underline"
              >
                Read More →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
