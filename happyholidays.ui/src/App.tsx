import "./App.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Topbar from "./components/Topbar/Topbar";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import InternationalComp from "./components/International/InternationalComp";
import DomesticComp from "./components/Domestic/DomesticComp";
import HoneymoonComp from "./components/Honeymoon/HoneymoonComp";
import AboutUs from "./components/AboutUs/AboutUs";
import { Routes, Route } from "react-router-dom";
import PackageDetails from "./components/PackageDetails/PackageDetails";
import Admin from "./components/Admin/Admin";
import AllPackages from "./components/Admin/AllPackages/AllPackages";
import CreatePackage from "./components/Admin/CreateOrEditPackage/CreateOrEditPackage";
import Queries from "./components/Admin/Queries/Queries";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Topbar />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/international" element={<InternationalComp />} />
        <Route path="/domestic" element={<DomesticComp />} />
        <Route path="/honeymoon" element={<HoneymoonComp />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/details/:id" element={<PackageDetails />} />

        {/* Put the below routes in private route */}
        <Route path="/admin" element={<Admin />}>
          <Route index element={<AllPackages />} />
          <Route path="create-package" element={<CreatePackage />} />
          <Route path="edit-package/:id" element={<CreatePackage />} />
          <Route path="queries" element={<Queries />} />
        </Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App;
