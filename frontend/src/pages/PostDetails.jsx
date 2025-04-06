// src/pages/PostDetails.jsx
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

// Dummy post data for detail view
const postData = {
  id: 1,
  title: "A Magical Journey Through Japan",
  content: `
    Japan is a land of contrasts, from serene temples to bustling neon cities. 
    I explored Kyoto's historic shrines and ended my day with the best ramen I've ever had in Tokyo.
    If you're planning a trip, don't miss the cherry blossom season – it's truly magical!
    
    I vlogged my entire journey so you can relive it with me. Watch, comment, and share your thoughts!
  `,
  image: "https://images.pexels.com/photos/16121690/pexels-photo-16121690.jpeg",
  category: "Travel",
  date: "April 1, 2025",
  author: "Ritesh Singh",
};

const PostDetails = () => {
  const { id } = useParams(); // you can use this to fetch real post data later

  return (
    <div className="bg-white text-gray-800 py-16 px-6 max-w-4xl mx-auto mt-10">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-6 text-[#1a1a1a]"
      >
        {postData.title}
      </motion.h1>

      <div className="text-sm text-gray-500 mb-6">
        <span className="mr-4">By {postData.author}</span>
        <span>{postData.date}</span>
      </div>

      <img
        src={postData.image}
        alt={postData.title}
        className="w-full h-72 object-cover rounded-lg mb-8"
      />

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-lg leading-relaxed"
      >
        {postData.content}
      </motion.p>
    </div>
  );
};

export default PostDetails;
