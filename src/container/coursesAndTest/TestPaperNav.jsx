import { useState } from "react";

export default function TestNavbar({ warnings, darkMode }) {
  return (
    <nav
      className={`flex justify-between items-center  text-white px-6   rounded-b-2xl ${
        darkMode ? " text-white bg-gray-500" : "bg-white text-black"
      } `}
    >
      {/* Left Side - Warning Message */}
      <div className="flex items-center space-x-3">
        {warnings > 0 && (
          <p className="text-red-400 font-semibold">
            ⚠ Warning: Do not switch tabs! ({warnings}/3)
          </p>
        )}
      </div>

      {/* Right Side - Profile Image */}
      {/* Webcam Monitoring */}
      <div className="w-12 h-12 ">
        <video
          id="webcam"
          className="w-16  rounded-full bg-cover overflow-hidden border-2 border-amber-50 "
          autoPlay
        ></video>
      </div>
    </nav>
  );
}
