import React from "react";

const HomeFooter = () => {
  return (
    <footer className="bg-black text-white py-6 px-4 md:px-12">
      <div className="w-full mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <div className="text-xl font-bold flex items-center">
            <span>2025 Book Fair</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          {/* Email */}
          <a
            href="mailto:hello@spendflo.com"
            className="text-sm hover:underline"
          >
            hello@spendflo.com
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto mt-4 border-t border-gray-700 pt-4 flex flex-col md:flex-row justify-between text-xs text-gray-400">
        <p>Copyright © 2020 Spendflo, Inc. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
