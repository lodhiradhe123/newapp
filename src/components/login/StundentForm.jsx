import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaApple, FaGoogle } from "react-icons/fa";
import TestPaperNavbar from "../navbar/TestPaperNavbar";

export default function Login() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [college, setCollege] = useState("");
  const [course, setCourse] = useState("");
  const [branch, setBranch] = useState("");
  const [passingYear, setPassingYear] = useState("");
  //   const [password, setPassword] = useState("");

  const [greeting, setGreeting] = useState("");
  const navigate = useNavigate();

  // Function to update greeting based on time of the day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning! ☀️");
    else if (hour < 18) setGreeting("Good Afternoon! 🌤");
    else setGreeting("Good Evening! 🌙");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/testPaper");
    console.log("Logging in with:", {
      fullName,
      email,
      phone,
      college,
      course,
      branch,
      passingYear,
      //   password,
    });
  };

  return (
    <>
      <TestPaperNavbar />
      <div className="flex w-full h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-yellow-100 ">
        {/* Left Side - Form Section */}
        <div className=" w-96 bg-white px-8 py-10 flex flex-col justify-center rounded-2xl">
          <h2 className="text-xl font-bold text-gray-800 text-center mb-2">
            {greeting}
          </h2>
          <p className="text-gray-600 text-center mb-6">Login to continue</p>

          <form onSubmit={handleSubmit} className="space-y-3 ">
            {/* Full Name */}
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-sm"
              placeholder="Full Name"
            />

            {/* Email ID */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-sm"
              placeholder="Email ID"
            />

            {/* Phone Number */}
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-sm"
              placeholder="Phone Number"
            />

            {/* College Name */}
            <input
              type="text"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-sm"
              placeholder="College Name"
            />

            {/* Course Selection */}
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-sm"
            >
              <option value="">Select Course</option>
              <option value="B.Tech">B.Tech</option>
              <option value="M.Tech">M.Tech</option>
              <option value="B.Sc">B.Sc</option>
              <option value="M.Sc">M.Sc</option>
              <option value="MBA">MBA</option>
            </select>

            {/* Branch */}
            <input
              type="text"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-sm"
              placeholder="Branch"
            />

            {/* Year of Passing */}
            <input
              type="number"
              value={passingYear}
              onChange={(e) => setPassingYear(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-sm"
              placeholder="Year of Passing"
            />

            {/* Password */}
            {/* <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-sm"
              placeholder="Password"
            /> */}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition font-semibold text-sm"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
