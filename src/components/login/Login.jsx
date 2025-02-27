import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaApple, FaGoogle } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
    // Add authentication logic here
    const key = localStorage.getItem("key");
    if (key === email) {
      navigate("/");
    } else {
      alert("Invalid credentials. Please try again.");
    }
    // Redirect to dashboard
    // window.location.href = "/";
  };

  return (
    <div className="flex h-screen bg-gray-400 items-center justify-center">
      <div className="flex w-[90%] max-w-4xl bg-white shadow-lg rounded-3xl overflow-hidden">
        {/* Left Side - Form Section */}
        <div className="w-1/2 bg-gradient-to-br from-gray-100 to-yellow-100 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800">Login</h2>
          <p className="text-gray-600 mb-6">Login to your existing account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
                placeholder="Enter your password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition font-semibold"
            >
              Submit
            </button>
          </form>

          {/* Social Login Buttons */}
          <div className="flex justify-center space-x-4 mt-4">
            <button className="flex items-center gap-2 px-6 py-2 border rounded-lg hover:bg-gray-100 transition">
              <FaApple className="text-lg" /> Apple
            </button>
            <button className="flex items-center gap-2 px-6 py-2 border rounded-lg hover:bg-gray-100 transition">
              <FaGoogle className="text-lg text-red-500" /> Google
            </button>
          </div>

          {/* Sign In Link */}
          <p className="text-sm text-gray-600 mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-yellow-500 hover:underline">
              Sign Up
            </Link>
          </p>

          {/* Terms & Conditions */}
          <p className="text-xs text-gray-500 text-center mt-2">
            <Link to="/terms" className="hover:underline">
              Terms & Conditions
            </Link>
          </p>
        </div>

        {/* Right Side - Image Section */}
        <div className="w-1/2 relative hidden md:flex items-center justify-center bg-gray-300">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Team Meeting"
            className="absolute w-full h-full object-cover rounded-r-3xl"
          />

          {/* Glassmorphic UI Overlay */}
          <div className="absolute bottom-5 right-5 bg-white bg-opacity-30 backdrop-blur-md p-4 rounded-lg shadow-md">
            <p className="text-gray-800 font-semibold">Daily Meeting</p>
            <p className="text-gray-600 text-sm">12:00pm - 01:00pm</p>
          </div>
        </div>
      </div>
    </div>
  );
}
