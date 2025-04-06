// src/pages/Home.jsx
import VlogSlider from '../components/Slider'
import Categories from '../components/Categories'
import FeaturedPosts from '../components/FeaturedPosts'
import CallToAction from '../components/CallToAction'
import CreatorSpotlight from '../components/CreatorSpotlight'
import Newsletter from '../components/Newsletter'

const Home = () => {
  return (
    <div className="flex flex-col gap-2">
      <VlogSlider />
      <Categories />
      <FeaturedPosts />
      <CreatorSpotlight />
      <CallToAction />
      <Newsletter />
    </div>
  )
}

export default Home;
