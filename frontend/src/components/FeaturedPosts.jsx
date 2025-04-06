const FeaturedPosts = () => {
    const posts = [
      {
        title: "Top 10 Beaches to Visit in 2025",
        image: "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg",
      },
      {
        title: "How to Start a Food Vlog in 2025",
        image: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg",
      },
    ];
  
    return (
      <div className="bg-white py-10 px-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#1a1a1a]">Featured Vlogs</h2>
        <div className="grid sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {posts.map((post, idx) => (
            <div key={idx} className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <img src={post.image} alt={post.title} className="w-full h-52 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-[#1a1a1a]">{post.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default FeaturedPosts;
  