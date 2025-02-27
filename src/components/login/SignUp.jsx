import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaApple, FaGoogle } from "react-icons/fa";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Signing up with:", { name, email, password });
    // Add authentication logic here

    localStorage.setItem("key", email);
    navigate("/Login");
  };

  return (
    <div className="flex h-screen bg-gray-400 items-center justify-center ">
      <div className="flex w-[90%] max-w-4xl bg-white shadow-lg rounded-3xl overflow-hidden">
        {/* Left Side - Image Section */}
        <div className="w-1/2 relative hidden md:flex items-center justify-center bg-gray-300">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Signup Illustration"
            className="absolute w-full h-full object-cover rounded-l-3xl"
          />

          {/* Glassmorphic UI Overlay */}
          <div className="absolute bottom-5 right-5 bg-white bg-opacity-30 backdrop-blur-md p-4 rounded-lg shadow-md">
            <p className="text-gray-800 font-semibold">Join the Community</p>
            <p className="text-gray-600 text-sm">
              Sign up and start learning today
            </p>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-10 bg-gradient-to-br from-gray-100 to-yellow-100 h-full">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Create an Account
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Join us and start your learning journey
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Email Address
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

            {/* Confirm Password Input */}
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
                placeholder="Confirm your password"
              />
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition font-semibold"
            >
              Sign Up
            </button>
          </form>

          {/* Login Redirect */}
          <p className="text-sm text-gray-600 mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-500 hover:underline">
              Log in
            </Link>
          </p>

          {/* Terms & Conditions */}
          <p className="text-xs text-gray-500 text-center mt-2">
            <Link to="/terms" className="hover:underline">
              Terms & Conditions
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
