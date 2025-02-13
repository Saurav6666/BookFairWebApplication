import React from "react";
import Layout from "../../components/Layout";
import { useCart } from "../../context/CartContext";
import { order } from "../../api-services/bookService";
import { toast } from "react-toastify";
import emptyCartImage from "../../../public/images/emptyCartImage.jpg";
import "react-toastify/dist/ReactToastify.css";

const MyCart = () => {
  const { cart = [], updateQuantity, removeFromCart, clearCart } = useCart();
  const safeCart = Array.isArray(cart) ? cart : [];

  const handleCheckout = async () => {
    if (safeCart.length === 0) {
      toast.warning("Your cart is empty.");
      return;
    }

    const orderItems = safeCart.map(
      ({ id, bookName, authorName, price, bookType, image, quantity }) => ({
        id,
        bookName,
        authorName,
        price,
        bookType,
        image,
        quantity,
      })
    );

    try {
      const response = await order({ items: orderItems });
      console.log("Order placed successfully:", response);
      toast.success("Order placed successfully!");
      clearCart();
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order.");
    }
  };

  return (
    <Layout>
      {safeCart.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-10 px-4">
          <img
            src={emptyCartImage}
            alt="Empty Cart"
            className="w-40 h-40 sm:w-64 sm:h-64"
          />
          <p className="text-gray-500 text-center mt-4">Your cart is empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
          {/* Cart Items Section */}
          <div className="md:col-span-2 bg-white shadow-md rounded-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              {safeCart.length} Items
            </h2>

            {safeCart.map((book) => (
              <div
                key={book.bookName}
                className="flex flex-col sm:flex-row items-center justify-between border-b pb-4 mb-4"
              >
                {/* Book Image & Details */}
                <div className="flex items-center w-full sm:w-auto">
                  <img
                    src={book.image}
                    alt={book.bookName}
                    className="w-16 h-24 sm:w-20 sm:h-28 object-cover rounded-md"
                  />
                  <div className="ml-4">
                    <h2 className="text-base sm:text-lg font-semibold">
                      {book.bookName}
                    </h2>
                    <p className="text-gray-500 text-sm sm:text-base">
                      {book.authorName}
                    </p>
                    <p className="text-blue-600 font-semibold text-sm sm:text-base">
                      ${book.price}
                    </p>
                    <button
                      className="text-red-500 text-xs sm:text-sm mt-2"
                      onClick={() => removeFromCart(book.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                  <button
                    className="border px-2 py-1 rounded text-sm"
                    onClick={() => updateQuantity(book.id, -1)}
                  >
                    -
                  </button>
                  <span className="px-3 py-1 border rounded text-sm">
                    {book.quantity}
                  </span>
                  <button
                    className="border px-2 py-1 rounded text-sm"
                    onClick={() => updateQuantity(book.id, 1)}
                  >
                    +
                  </button>
                </div>

                <span className="text-base sm:text-lg font-semibold mt-2 sm:mt-0">
                  ${(book.price * book.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Order Summary Section */}
          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Order Summary
            </h2>

            <div className="flex justify-between mb-2">
              <span className="text-sm sm:text-base">
                Items{" "}
                {safeCart.reduce(
                  (total, book) => total + (book.quantity || 0),
                  0
                )}
              </span>
              <span className="font-semibold text-sm sm:text-base">
                $
                {safeCart
                  .reduce(
                    (total, book) => total + book.price * (book.quantity || 0),
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between mb-4">
              <span className="text-sm sm:text-base">Shipping</span>
              <select className="border px-2 py-1 rounded text-sm sm:text-base">
                <option>Standard Delivery - $5.00</option>
              </select>
            </div>

            <div className="flex justify-between text-base sm:text-lg font-semibold mt-4">
              <span>Total Cost</span>
              <span>
                $
                {(
                  safeCart.reduce(
                    (total, book) => total + book.price * (book.quantity || 0),
                    0
                  ) + 5
                ).toFixed(2)}
              </span>
            </div>

            <button
              className="mt-4 w-full bg-purple-600 text-white py-2 sm:py-3 rounded text-sm sm:text-lg hover:bg-purple-700"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default MyCart;
