import React from "react";
import { Link } from "react-router";

const Sidebar = () => {
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <aside className="h-full w-60 p-4 bg-slate-700 text-white">
      <nav className="mt-10">
        {storedUser?.role === "seller" ? (
          <ul className="space-y-2">
            <li>
              <Link
                to="/seller-dashboard"
                className="block p-2 hover:bg-slate-600 rounded"
              >
                📊 Sales Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/books-listing"
                className="block p-2 hover:bg-slate-600 rounded"
              >
                📚 My Books
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="space-y-2">
            <li>
              <Link to="/home" className="block p-2 hover:bg-slate-600 rounded">
                🏠 Home
              </Link>
            </li>

            <li>
              <Link
                to="/my-cart"
                className="block p-2 hover:bg-slate-600 rounded"
              >
                🛒 My Cart
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
