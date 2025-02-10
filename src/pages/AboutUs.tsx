import React from "react";
import { useNavigate } from "react-router";
import { FaBookOpen, FaCalendarAlt } from "react-icons/fa";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
const BookFairSection = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Trending Sellers */}
      <div className="bg-gray-900 flex justify-center items-center ">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-80 text-center h-[40vh]">
          {/* Profile Image */}
          <div className="relative w-24 h-24 mx-auto -mt-16 border-4 border-white rounded-full overflow-hidden">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name and Title */}
          <h2 className="mt-4 text-xl font-semibold text-gray-800">
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
          <p className="mt-4 text-gray-600 text-sm px-4">
            Ariel Cerda is the visionary behind the International Book Fair, a
            platform that brings together authors, publishers, and readers from
            around the world. Passionate about literature and cultural exchange,
            Ariel has dedicated years to promoting reading and fostering
            creativity.
          </p>
        </div>
      </div>

      {/* About Us & Features */}
      <div className="col-span-1 md:col-span-2 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-2xl font-semibold mb-3 text-center">
          Welcome to the Annual Book Fair!
        </h2>
        <p className="text-gray-600 mb-5 text-center">
          Explore thousands of books from top authors, enjoy exclusive book
          signings, and get exciting discounts. A paradise for book lovers!
        </p>

        <h3 className="text-xl font-semibold mb-3 text-center flex items-center justify-center gap-2">
          <FaBookOpen className="text-blue-500" /> Fair Highlights
        </h3>
        <ul className="list-disc pl-5 md:pl-8 text-gray-700 space-y-2">
          <li>📚 Thousands of books across all genres</li>
          <li>✍️ Meet and greet with bestselling authors</li>
          <li>💰 Special discounts on exclusive collections</li>
          <li>🎭 Live storytelling and book reading sessions</li>
          <li>🎁 Surprise giveaways & contests</li>
        </ul>

        <div className="text-center mt-6">
          <button
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
            onClick={() => navigate("/register")}
          >
            📖 Get Your Book Now
          </button>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 md:col-span-3">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
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
              className="p-3 bg-gray-100 rounded-lg flex justify-between items-center hover:bg-gray-200 transition"
            >
              <span className="font-medium">{item.event}</span>
              <span className="text-gray-500 text-sm">{item.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookFairSection;
