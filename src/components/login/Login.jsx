import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TestPaperNavbar from "../navbar/TestPaperNavbar";

export default function Login() {
  const [enrollment, setEnrollment] = useState("");
  const [passwordKey, setPasswordKey] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", { enrollment, passwordKey });
    navigate("/studentForm");
  };

  return (
    <>
      <TestPaperNavbar />
      <div
        className="flex h-screen items-center justify-center bg-cover bg-center px-6 bg-gradient-to-br from-gray-100 to-yellow-100"
        // style={{
        //   backgroundImage:
        //     "url('https://plus.unsplash.com/premium_photo-1675695700239-44153e6bf430?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFwZXIlMjBzdHVkZW50JTIwYmx1cmUlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D')",
        // }}
      >
        {/* Container for both sections */}

        {/* Right Side - Login Form */}
        <div className="w-96 p-10 bg-white rounded-2xl">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Login to Continue
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Enter your details below
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            {/* Enrollment Number */}
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Enrollment Number
              </label>
              <input
                type="text"
                value={enrollment}
                onChange={(e) => setEnrollment(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-50"
                placeholder="Enter your Enrollment"
              />
            </div>

            {/* Test Key */}
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Test Key
              </label>
              <input
                type="text"
                value={passwordKey}
                onChange={(e) => setPasswordKey(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-50"
                placeholder="Enter your Key"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition font-semibold"
            >
              Start Test
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-4">
            <Link to="/terms" className="hover:underline">
              Terms & Conditions
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
