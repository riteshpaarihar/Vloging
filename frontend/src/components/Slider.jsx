// src/components/Slider.jsx
import Slider from "react-slick";
import { motion } from "framer-motion";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  {
    title: "Explore Top Vlogs",
    description: "Discover new creators and follow their stories every day!",
    image: "https://images.pexels.com/photos/31133725/pexels-photo-31133725/free-photo-of-streetlamp-amidst-blooming-cherry-blossoms-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    title: "Join the Community",
    description: "Engage, like, and comment on exciting content.",
    image: "https://images.pexels.com/photos/18625803/pexels-photo-18625803/free-photo-of-couple-silhouette-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    title: "Create Your Own Vlog",
    description: "Start your journey and inspire others.",
    image: "https://images.pexels.com/photos/31346262/pexels-photo-31346262/free-photo-of-idyllic-view-of-amalfi-coastline-italy.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

const Slide = ({ title, description, image }) => (
  <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px]">
    <img
      src={image}
      alt={title}
      loading="lazy"
      className="w-full h-full object-cover"
    />
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white p-4"
    >
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{title}</h2>
      <p className="text-lg sm:text-xl max-w-2xl">{description}</p>
    </motion.div>
  </div>
);

const VlogSlider = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    appendDots: dots => (
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <ul className="flex gap-2">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 bg-white rounded-full opacity-60 hover:opacity-100 transition" />
    ),
  };

  return (
    <div className="w-full relative">
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide, index) => (
          <Slide key={index} {...slide} />
        ))}
      </Slider>

      {/* Manual Arrows */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
        <button
          onClick={() => sliderRef.current?.slickPrev()}
          className="bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={24} />
        </button>
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
        <button
          onClick={() => sliderRef.current?.slickNext()}
          className="bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition"
          aria-label="Next Slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default VlogSlider;
