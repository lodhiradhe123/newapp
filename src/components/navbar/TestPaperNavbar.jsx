import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { FaBell, FaUserCircle } from "react-icons/fa";

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Change for real auth
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState(3); // Example: 3 unread notifications

  return (
    <nav className="bg-gradient-to-r from-gray-100 to-yellow-100 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-5 py-4">
        {/* Left Side - Brand & Profile */}
        <div className="flex items-center gap-3 ">
          <Link to="/" className="text-xl font-bold text-gray-800">
            Code Canvas
          </Link>
        </div>

        {/* Right Side - Login/Logout */}
        <div className="hidden md:flex gap-2">
          <div className="relative p-4">
            {/* Notification Icon */}
            <div className="relative cursor-pointer text-gray-700 hover:text-yellow-500 transition -mb-10">
              {/* Notification Badge */}
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiOutlineMenu />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
