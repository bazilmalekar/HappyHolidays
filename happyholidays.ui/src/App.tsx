import "./App.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Topbar from "./components/Topbar/Topbar";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import International from "./components/Home/Hero/International";
import Domestic from "./components/Home/Hero/Domestic/Domestic";
import AboutUs from "./components/Home/AboutUs/AboutUs";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Topbar />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/int" element={<International />} />
        <Route path="/dom" element={<Domestic />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
