import {
  BellIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  Bars3Icon,
} from "@heroicons/react/16/solid";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../context/CartContext";

type HeaderProps = {
  hadleRegistration?: () => void;
  hadleLogin?: () => void;
};

const Header: React.FC<HeaderProps> = ({ hadleRegistration, hadleLogin }) => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <header className="flex justify-between items-center bg-white shadow-md p-4 lg:p-6">
      {/* Sidebar Toggle Button (Mobile) */}

      {/* Logo or Shop Name */}
      <div className="flex items-center space-x-2">
        {user?.role === "seller" ? (
          <>
            <h1 className="text-2xl font-bold text-blue-600 capitalize">
              {user.shopname}
            </h1>
          </>
        ) : (
          <h1 className="text-2xl font-bold text-blue-600">Book Fair</h1>
        )}
      </div>

      {/* Navigation */}
      {hadleRegistration ? (
        <div className="space-x-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={hadleRegistration}
          >
            Register
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={hadleLogin}
          >
            Login
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          {/* Cart Icon (Only for Buyer) */}
          {user?.role === "buyer" && (
            <div
              className="relative cursor-pointer"
              onClick={() => navigate("/my-cart")}
            >
              <ShoppingCartIcon className="w-6 h-6 text-gray-600" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </div>
          )}

          <BellIcon
            className="w-6 h-6 text-gray-500 cursor-pointer"
            onClick={() => navigate("/sales")}
          />

          {/* User Profile */}
          <div className="relative">
            <img
              src="https://i.pravatar.cc/50"
              alt="User"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-10 h-10 rounded-full object-cover cursor-pointer"
            />

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
                <button
                  className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
                  onClick={() => navigate("/seller-profile")}
                >
                  <UserCircleIcon className="w-5 h-5 mr-2 text-gray-600" />
                  My Profile
                </button>
                <button
                  className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-red-500"
                  onClick={() =>
                    localStorage.removeItem("user") || navigate("/")
                  }
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
