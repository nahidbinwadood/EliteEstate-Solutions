import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <ScrollRestoration></ScrollRestoration>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
