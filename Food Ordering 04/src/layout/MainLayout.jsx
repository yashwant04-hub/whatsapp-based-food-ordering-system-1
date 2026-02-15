import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <Navbar />
      
      <div className="p-8">
        <Outlet />
      </div>
    </>
  );
}

export default MainLayout;
