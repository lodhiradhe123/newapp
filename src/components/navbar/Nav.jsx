import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { FaBell, FaUserCircle } from "react-icons/fa";

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Change for real auth
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState(3); // Example: 3 unread notifications

  useEffect(() => {
    const username = localStorage.getItem("key");
    if (username) {
      setIsAuthenticated(true);
    }
  });

  const logOut = () => {
    localStorage.removeItem("key");
    setIsAuthenticated(false);
  };

  return (
    <nav className="bg-gradient-to-r from-gray-100 to-yellow-100 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-5 py-4">
        {/* Left Side - Brand & Profile */}
        <div className="flex items-center gap-3 ">
          <Link to="/" className="text-xl font-bold text-gray-800">
            Indew
          </Link>

          {/* Profile Dropdown */}
          {isAuthenticated && dropdownOpen && (
            <div className="absolute top-12 right-2 bg-white text-gray-700 shadow-md rounded-md w-40 p-2 backdrop-blur-lg z-10">
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                Profile
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Settings
              </Link>
              <Link
                to="/learningDashboard"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Couses & Test
              </Link>
              <button
                onClick={logOut}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Center - Navigation Links */}
        <div className="hidden md:flex gap-6 text-lg font-medium">
          <Link to="/" className="hover:text-yellow-600 transition">
            Home
          </Link>
          <Link to="/about" className="hover:text-yellow-600 transition">
            About
          </Link>
          <Link to="/programs" className="hover:text-yellow-600 transition">
            Programs
          </Link>
          <Link to="/contact" className="hover:text-yellow-600 transition">
            Contact
          </Link>
        </div>

        {/* Right Side - Login/Logout */}
        <div className="hidden md:flex gap-2">
          <div className="relative p-4">
            {/* Notification Icon */}
            <div className="relative cursor-pointer text-gray-700 hover:text-yellow-500 transition -mb-10">
              <FaBell className="text-lg" />

              {/* Notification Badge */}
              {notifications > 0 && (
                <span className="absolute -top-4 -right-1 bg-red-500 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {notifications}
                </span>
              )}
            </div>
          </div>

          {!isAuthenticated ? (
            <Link
              to="/login"
              className="bg-yellow-500 px-5 py-2 rounded-lg hover:bg-yellow-600 transition h-10"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="relative flex items-center gap-2 hover:text-gray-700 transition"
            >
              <img
                src="https://media.istockphoto.com/id/1161222762/photo/thoughtful-female-student-carrying-books.webp?a=1&b=1&s=612x612&w=0&k=20&c=Ye0qpBYoSXCDqvEPu38jn77vAD80hTIrEdv-b_KpvDE="
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              {/* <span className="font-semibold text-lg">User</span> */}
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white py-4 shadow-lg backdrop-blur-lg">
          <Link
            to="/"
            className="block text-center py-2 hover:bg-gray-200"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block text-center py-2 hover:bg-gray-200"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/programs"
            className="block text-center py-2 hover:bg-gray-200"
            onClick={() => setMenuOpen(false)}
          >
            Programs
          </Link>
          <Link
            to="/contact"
            className="block text-center py-2 hover:bg-gray-200"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>

          {isAuthenticated ? (
            <button
              onClick={() => setIsAuthenticated(false)}
              className="w-full text-center bg-red-500 py-2 mt-2"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="block text-center bg-yellow-500 py-2 mt-2"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
