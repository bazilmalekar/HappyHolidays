import "./App.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Topbar from "./components/Topbar/Topbar";

const App = () => {
  return (
    <>
    <ToastContainer />
    <Topbar />
    Awesome!
    </>
  )
}

export default App
