import React, { useEffect, useState } from "react";
import banner1 from "../../public/images/bookbanner.jpg";
import banner2 from "../../public/images/banner.jpg";
import banner3 from "../../public/images/mainbanner.jpg";

const banners = [banner1, banner2, banner3];

const BannerCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 3000); // Auto-slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-96 overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <img
            key={index}
            src={banner}
            alt={`Banner ${index + 1}`}
            className="w-full h-96 object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() =>
          setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? banners.length - 1 : prevIndex - 1
          )
        }
        className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
      >
        {"<"}
      </button>
      <button
        onClick={() =>
          setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length)
        }
        className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
      >
        {">"}
      </button>

      {/* Dots for Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
