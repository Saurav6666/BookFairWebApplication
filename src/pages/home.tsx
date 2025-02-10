import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { authors, books } from "./utils";
import BannerCarousel from "../components/Banner";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* ✅ Responsive Header */}
      <header className="flex flex-wrap justify-between items-center bg-white shadow-md p-4 md:p-6 sticky top-0 z-10">
        <div className="flex items-center space-x-2">
          {user?.role === "seller" ? (
            <>
              {user.logo && (
                <img
                  src={user.logo.replace("C:\\fakepath\\", "/uploads/")}
                  alt="Shop Logo"
                  className="w-8 h-8 md:w-10 md:h-10 object-cover rounded-full"
                />
              )}
              <h1 className="text-lg md:text-2xl font-bold text-blue-600">
                {user.shopname}
              </h1>
            </>
          ) : (
            <h1 className="text-lg md:text-2xl font-bold text-blue-600">
              Book Fair
            </h1>
          )}
        </div>

        <div className="flex space-x-2 md:space-x-4 mt-2 md:mt-0">
          <button
            className="bg-blue-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-lg hover:bg-blue-700 text-sm md:text-base"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
          <button
            className="bg-blue-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-lg hover:bg-blue-700 text-sm md:text-base"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </header>

      {/* ✅ Responsive Banner */}
      <div className="flex w-full h-64 md:h-96">
        <BannerCarousel />
      </div>

      {/* ✅ Grid Layout for Content */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Trending Sellers */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Trending Sellers</h2>
          <div className="space-y-3">
            {["Author A", "Author B", "Author C"].map((seller, index) => (
              <div
                key={index}
                className="p-2 bg-gray-200 rounded-lg text-center"
              >
                {seller}
              </div>
            ))}
          </div>
        </div>

        {/* About Us & Features */}
        <div className="col-span-1 md:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg md:text-xl font-semibold mb-2 text-center">
            About Us
          </h2>
          <p className="text-gray-600 mb-4 text-center">
            Welcome to the annual book fair! Explore a wide range of books from
            various genres and meet renowned authors.
          </p>

          <h3 className="text-lg font-semibold mb-2 text-center">Features</h3>
          <ul className="list-disc pl-4 md:pl-6 text-gray-600 mb-4">
            <li>Thousands of books from top authors</li>
            <li>Exclusive book signings and launches</li>
            <li>Special discounts and offers</li>
          </ul>

          <div className="text-center">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              onClick={() => navigate("/register")}
            >
              Let’s Shop
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Responsive Author Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-center">
          World-Renowned Authors
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {authors.map((author, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold">{author.name}</h3>
              <p className="text-gray-600">{author.bio}</p>
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
    </div>
  );
};

export default Home;
