// import "./App.css";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import PostList from "./pages/PostList.jsx";
import PostDetails from "./pages/PostDetails.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // Dummy components for now
 // const Home = () => <h1 className="text-center text-2xl mt-10">🏠 Home Page</h1>;
  //const About = () => <h1 className="text-center text-2xl mt-10">📘 About Page</h1>;
  //const Contact = () => <h1 className="text-center text-2xl mt-10">📞 Contact Page</h1>;
  //const Posts = () => <h1 className="text-center text-2xl mt-10">📝 Posts Page</h1>;
  // const Login = () => <h1 className="text-center text-2xl mt-10">🔐 Login Page</h1>;
  // const Register = () => <h1 className="text-center text-2xl mt-10">🧾 Register Page</h1>;

  return (
    <>
      <Navbar />
      <div className="pt-2">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
      <Footer/>
    </>
  );
}

export default App;
