import { BellIcon, ShoppingCartIcon, UserCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router";
import { HeaderProps, User } from "./Utils";

const Header: React.FC<HeaderProps> = ({ hadleRegistration, hadleLogin }) => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <header className="flex justify-between items-center bg-gradient-to-r from-blue-800 to-blue-600 shadow-lg px-6 py-4 md:px-10 md:py-5 sticky top-0 z-50">
      {/* Logo or Shop Name */}
      <div className="flex items-center space-x-3">
        {user?.role === "seller" ? (
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide capitalize">
            📖 {user.shopname}
          </h1>
        ) : (
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide">
            📖 Book Fair
          </h1>
        )}
      </div>

      {/* Navigation */}
      {hadleRegistration ? (
        <div className="space-x-3 md:space-x-5">
          <button
            className="bg-white text-blue-700 px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold hover:bg-blue-100 transition duration-300 text-sm md:text-base shadow-md"
            onClick={hadleRegistration}
          >
            Register
          </button>
          <button
            className="bg-yellow-400 text-gray-900 px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold hover:bg-yellow-300 transition duration-300 text-sm md:text-base shadow-md"
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
              <ShoppingCartIcon className="w-6 h-6 text-white" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </div>
          )}

          {/* User Profile */}
          <div className="relative">
            <img
              src="https://i.pravatar.cc/50"
              alt="User"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-white"
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
                  onClick={() => {
                    localStorage.removeItem("user");
                    navigate("/");
                  }}
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
