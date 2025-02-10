import React from "react";
import { Link } from "react-router";

const MobileNav: React.FC = () => {
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <nav className="bg-slate-500 shadow-md p-3">
      <ul className="flex justify-around text-white text-sm font-medium">
        {storedUser?.role === "seller" ? (
          <>
            <li>
              <Link to="/seller-dashboard" className="p-2">
                Sales Dashboard
              </Link>
            </li>
            <li>
              <Link to="/books-listing" className="p-2">
                My Books
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/home" className="p-2">
                Home
              </Link>
            </li>

            <li>
              <Link to="/my-cart" className="p-2">
                My Cart
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default MobileNav;
