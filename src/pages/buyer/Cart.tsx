import React from "react";
import Layout from "../../components/Layout";
import { useCart } from "../../context/CartContext";
import { order } from "../../api-services/bookService";

const MyCart = () => {
  const { cart = [], updateQuantity, removeFromCart } = useCart();

  // Ensure cart is an array
  const safeCart = Array.isArray(cart) ? cart : [];

  // Function to handle checkout
  const handleCheckout = async () => {
    if (safeCart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    // Transform cart data: merge duplicate books and update quantity
    const orderItems = safeCart.map(
      ({ bookName, authorName, price, bookType, image, quantity }) => ({
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
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order.");
    }
  };

  return (
    <Layout>
      {safeCart.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-3 gap-8">
          {/* Left Side: Cart Items */}
          <div className="col-span-2 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              {safeCart.length} Items
            </h2>

            {safeCart.map((book) => (
              <div
                key={book.bookName}
                className="flex items-center justify-between border-b pb-4 mb-4"
              >
                <div className="flex items-center">
                  <img
                    src={book.image}
                    alt={book.bookName}
                    className="w-20 h-28 object-cover rounded-md"
                  />
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold">{book.bookName}</h2>
                    <p className="text-gray-500">{book.authorName}</p>
                    <p className="text-blue-600 font-semibold">${book.price}</p>
                    <button
                      className="text-red-500 text-sm mt-2"
                      onClick={() => removeFromCart(book.bookName)}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    className="border px-2 py-1 rounded"
                    onClick={() => updateQuantity(book.bookName, -1)}
                  >
                    -
                  </button>
                  <span className="px-3 py-1 border rounded">
                    {book.quantity}
                  </span>
                  <button
                    className="border px-2 py-1 rounded"
                    onClick={() => updateQuantity(book.bookName, 1)}
                  >
                    +
                  </button>
                </div>

                <span className="text-lg font-semibold">
                  ${(book.price * book.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Right Side: Order Summary */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="flex justify-between mb-2">
              <span>
                Items{" "}
                {safeCart.reduce(
                  (total, book) => total + (book.quantity || 0),
                  0
                )}
              </span>
              <span className="font-semibold">
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
              <span>Shipping</span>
              <select className="border px-2 py-1 rounded">
                <option>Standard Delivery - $5.00</option>
              </select>
            </div>

            <div className="flex justify-between text-lg font-semibold mt-4">
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
              className="mt-4 w-full bg-purple-600 text-white py-3 rounded text-lg hover:bg-purple-700"
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
