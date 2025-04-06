const CreatorSpotlight = () => (
  <div className="bg-[#1a1a1a] py-10 px-6 text-center text-white">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Creator Spotlight</h2>
      <img
        src="https://images.pexels.com/photos/3775535/pexels-photo-3775535.jpeg"
        alt="Creator"
        className="w-40 h-40 object-cover rounded-full mx-auto mb-4"
        loading="lazy"
      />
      <h3 className="text-xl font-semibold">Ava Johnson</h3>
      <p className="mt-2 text-gray-300">
        “Traveling the world and documenting the beauty of different cultures is my passion.”
      </p>
    </div>
  </div>
);

export default CreatorSpotlight;
