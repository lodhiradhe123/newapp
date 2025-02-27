import { useState } from "react";
import { FaEdit, FaCamera } from "react-icons/fa";

export default function UserProfile() {
  const [profilePic, setProfilePic] = useState(
    "https://media.istockphoto.com/id/1161222762/photo/thoughtful-female-student-carrying-books.webp?a=1&b=1&s=612x612&w=0&k=20&c=Ye0qpBYoSXCDqvEPu38jn77vAD80hTIrEdv-b_KpvDE=" // Default profile picture
  );

  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
    dob: "2002-05-15",
    address: "123 Main Street, City, Country",
    enrollment: "NUKE-12345",
    course: "Computer Science",
    year: "3rd Year",
    gpa: "3.8",
  });

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        {/* Profile Header */}
        <div className="flex flex-col items-center relative">
          <div className="relative">
            <img
              src={profilePic}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-yellow-500 object-cover"
            />
            <label className="absolute bottom-2 right-2 bg-yellow-500 p-2 rounded-full cursor-pointer">
              <FaCamera className="text-white text-sm" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePicChange}
              />
            </label>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-4">{user.name}</h2>
          <p className="text-gray-600">
            {user.course} - {user.year}
          </p>
        </div>

        {/* Student Information Section */}
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
            Personal Information
          </h3>
          <div className="grid grid-cols-2 gap-4 text-gray-700">
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>Date of Birth:</strong> {user.dob}
            </p>
            <p>
              <strong>Address:</strong> {user.address}
            </p>
          </div>
        </div>

        {/* Academic Details Section */}
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
            Academic Details
          </h3>
          <div className="grid grid-cols-2 gap-4 text-gray-700">
            <p>
              <strong>Enrollment:</strong> {user.enrollment}
            </p>
            <p>
              <strong>Course:</strong> {user.course}
            </p>
            <p>
              <strong>Year:</strong> {user.year}
            </p>
            <p>
              <strong>GPA:</strong> {user.gpa}
            </p>
          </div>
        </div>

        {/* Edit Button */}
        <div className="mt-6 flex justify-center">
          <button className="bg-yellow-500 text-white px-6 py-2 rounded-xl hover:bg-yellow-600 transition flex items-center gap-2">
            <FaEdit />
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
