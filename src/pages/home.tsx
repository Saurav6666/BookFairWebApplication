import React from "react";
import { useNavigate } from "react-router";
import { authorImages, authors, books } from "./utils";
import BannerCarousel from "../components/Banner";
import BookFairSection from "./AboutUs";
import HomeFooter from "../components/HomeFooter";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <header className="flex flex-wrap justify-between items-center bg-gradient-to-r from-blue-800 to-blue-600 shadow-lg px-6 py-4 md:px-10 md:py-5 sticky top-0 z-50">
        {/* Logo / Branding */}
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide">
            📖 Book Fair
          </h1>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 md:space-x-5">
          <button
            className="bg-white text-blue-700 px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold hover:bg-blue-100 transition duration-300 text-sm md:text-base shadow-md"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
          <button
            className="bg-yellow-400 text-gray-900 px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold hover:bg-yellow-300 transition duration-300 text-sm md:text-base shadow-md"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </header>
      <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 overflow-hidden ">
        {/* ✅ Responsive Header */}

        {/* ✅ Responsive Banner */}
        <div className="flex w-full h-64 md:h-96">
          <BannerCarousel />
        </div>

        {/* ✅ Grid Layout for Content */}
        <BookFairSection />

        {/* ✅ Responsive Author Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4 text-center">
            World-Renowned Authors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {authors.map((author, index) => (
              <div
                key={index}
                className="relative bg-white rounded-lg overflow-hidden shadow-md"
              >
                {/* Gradient Background */}
                <div className="h-20 bg-gradient-to-r from-blue-500 to-purple-500"></div>

                {/* Profile Image */}
                <div className="flex flex-col items-center -mt-10">
                  <img
                    src={authorImages[index % authorImages.length]} // Picks a random image from the list
                    alt={author.name}
                    className="w-20 h-20 rounded-full border-4 border-white object-cover"
                  />
                  <h3 className="text-lg font-semibold mt-2">{author.name}</h3>
                  <p className="text-gray-500 italic">{author.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Responsive Books Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4 text-center">
            Featured Books
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {books.map((book) => (
              <img
                key={book.id}
                src={book.src}
                alt={book.alt}
                className="w-full max-w-[150px] sm:max-w-[200px] md:max-w-[300px] h-auto object-cover rounded-lg mx-auto"
              />
            ))}
          </div>
        </div>
        <HomeFooter />
      </div>
    </>
  );
};

export default Home;
