import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <div className="flex justify-between items-center px-8 py-4 shadow-md bg-white">

    
      <div className="flex items-center space-x-3">
        <img
          src={logo}
          alt="Restaurant Logo"
          className="w-50 h-12 object-contain"
        />

        <h1 className="text-2xl font-bold text-orange-600">
          
        </h1>
      </div>

    
      <div className="space-x-8 font-medium">
        <Link to="/" className="hover:text-orange-600">Home</Link>
        <Link to="/menu" className="hover:text-orange-600">Menu</Link>
        <Link to="/orders" className="hover:text-orange-600">Orders</Link>
      </div>

    </div>
  );
}

export default Navbar;
