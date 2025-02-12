import React from "react";
import { useNavigate } from "react-router";
import { FaBookOpen, FaCalendarAlt } from "react-icons/fa";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const BookFairSection = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
      {/* Trending Sellers */}
      <div className="bg-gray-900 flex justify-center items-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-xs sm:max-w-sm text-center">
          {/* Profile Image */}
          <div className="relative w-24 h-24 mx-auto -mt-16 border-4 border-white rounded-full overflow-hidden">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name and Title */}
          <h2 className="mt-4 text-lg sm:text-xl font-semibold text-gray-800">
            Ariel Cerda
          </h2>
          <p className="text-gray-500 text-sm">
            Founder - International Book Fair
          </p>

          {/* Social Icons */}
          <div className="flex justify-center space-x-4 mt-3 text-gray-600">
            <FaGithub
              className="cursor-pointer hover:text-gray-800"
              size={20}
            />
            <FaLinkedin
              className="cursor-pointer hover:text-blue-600"
              size={20}
            />
            <FaInstagram
              className="cursor-pointer hover:text-pink-500"
              size={20}
            />
          </div>

          {/* Description */}
          <p className="mt-4 text-gray-600 text-sm sm:text-base px-2 sm:px-4">
            Ariel Cerda is the visionary behind the International Book Fair, a
            platform that brings together authors, publishers, and readers from
            around the world.
          </p>
        </div>
      </div>

      {/* About Us & Features */}
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg border border-gray-200 col-span-1 md:col-span-2">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-center">
          Welcome to the Annual Book Fair!
        </h2>
        <p className="text-gray-600 mb-5 text-center text-sm sm:text-base">
          Explore thousands of books from top authors, enjoy exclusive book
          signings, and get exciting discounts.
        </p>

        <h3 className="text-lg sm:text-xl font-semibold mb-3 text-center flex items-center justify-center gap-2">
          <FaBookOpen className="text-blue-500" /> Fair Highlights
        </h3>
        <ul className="list-disc pl-5 sm:pl-8 text-gray-700 space-y-2 text-sm sm:text-base">
          <li>📚 Thousands of books across all genres</li>
          <li>✍️ Meet and greet with bestselling authors</li>
          <li>💰 Special discounts on exclusive collections</li>
          <li>🎭 Live storytelling and book reading sessions</li>
          <li>🎁 Surprise giveaways & contests</li>
        </ul>

        <div className="text-center mt-6">
          <button
            className="bg-green-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
            onClick={() => navigate("/register")}
          >
            📖 Get Your Book Now
          </button>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg border border-gray-200 col-span-1 md:col-span-3">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
          <FaCalendarAlt className="text-red-500" /> Upcoming Events
        </h2>
        <div className="space-y-3">
          {[
            { date: "March 10, 2025", event: "Book Signing with J.K. Rowling" },
            { date: "March 12, 2025", event: "Mystery Novel Discussion Panel" },
            { date: "March 15, 2025", event: "Children's Storytelling Hour" },
          ].map((item, index) => (
            <div
              key={index}
              className="p-3 bg-gray-100 rounded-lg flex flex-col sm:flex-row justify-between items-center text-center sm:text-left hover:bg-gray-200 transition"
            >
              <span className="font-medium text-sm sm:text-base">
                {item.event}
              </span>
              <span className="text-gray-500 text-xs sm:text-sm">
                {item.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookFairSection;
