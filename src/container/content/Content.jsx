import React from "react";
import Navbar from "../../components/navbar/Nav";

function Content() {
  return (
    <>
      <Navbar />
      <div
        className="relative h-screen w-full bg-cover bg-center flex items-center text-white rounded-b-2xl overflow-hidden px-6 sm:px-12"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHN0dWRlbnR8ZW58MHx8MHx8fDA%3D')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-70 opacity-70"></div>

        {/* Text Content */}
        <div className="relative w-full sm:w-3/4 md:w-1/2 lg:w-1/2 text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Your Future Starts Here
          </h1>
          <p className="text-lg sm:text-xl mt-4">
            Apply to college for the first time or transfer to complete your
            degree. Navigate your entire college application journey with Common
            App.
          </p>
          <button className="px-5 py-3 bg-yellow-300 text-black font-bold rounded-lg mt-6 hover:bg-yellow-400 transition">
            Start Your Application
          </button>
        </div>
      </div>

      {/* Example Additional Content */}
      <div className="py-10 text-center">
        <h1 className="text-2xl font-semibold">Welcome to Our Platform</h1>
      </div>
    </>
  );
}

export default Content;
