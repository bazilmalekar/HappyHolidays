import "./App.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Topbar from "./components/Topbar/Topbar";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <>
    <ToastContainer />
    <Topbar />
    <Header />
    Awesome!
    <Footer />
    </>
  )
}

export default App
