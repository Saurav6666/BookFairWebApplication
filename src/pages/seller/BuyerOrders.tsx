import React, { useEffect, useState } from "react";
import { Search, Filter } from "lucide-react";
import Layout from "../../components/Layout";
import { getOrders } from "../../api-services/bookService";
import { Book, Order } from "./Utils";

const SalesDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const todayDate = new Date().toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = (await getOrders()) as unknown as Order[]; // Temporary Fix
        const updatedOrders: Order[] = data.map((order) => ({
          ...order,
          date: order.date || todayDate,
          books: order.books.map((book: Book) => ({
            id: book.id || "",
            bookName: book.bookName || "Unknown",
            authorName: book.authorName || "Unknown",
            price: book.price || 0,
            bookType: book.bookType || "Unknown",
            image: book.image || "",
            quantity: book.quantity || 1,
          })),
        }));
        setOrders(updatedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Layout>
      <div className="p-6 bg-gray-100 min-h-screen">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Orders</h2>
          <div className="flex gap-2">
            <button className="flex items-center border px-4 py-2 rounded-md">
              <Search className="w-4 h-4 mr-2" /> Search
            </button>
            <button className="flex items-center border px-4 py-2 rounded-md">
              <Filter className="w-4 h-4 mr-2" /> Filters
            </button>
          </div>
        </div>

        {/* Responsive Table for Large Screens */}
        <div className="hidden md:block bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-4 text-left">Order ID</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Books Name</th>
                <th className="p-4 text-left">Book Cover</th>
                <th className="p-4 text-left">Author Name</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="p-4">{order.id}</td>
                  <td className="p-4">{order.date}</td>
                  <td className="p-4">
                    {order.books.map((book, index) => (
                      <div key={index}>
                        <span className="font-semibold">{book.bookName}</span>
                      </div>
                    ))}
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {order.books.map((book, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 border p-2 rounded-md w-full sm:w-auto"
                        >
                          <img
                            src={
                              book.image instanceof File
                                ? URL.createObjectURL(book.image)
                                : book.image
                            }
                            alt={book.bookName}
                            className="w-14 h-14 rounded-md object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    {order.books.map((book, index) => (
                      <div key={index}>
                        <span className="font-semibold">{book.authorName}</span>
                      </div>
                    ))}
                  </td>
                  <td className="p-4">
                    {order.books.reduce((total, book) => total + book.price, 0)}
                    $
                  </td>
                  <td className="p-4">
                    {order.books.reduce(
                      (total, book) => total + book.quantity,
                      0
                    )}
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Card View for Mobile Screens */}
        <div className="md:hidden space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white shadow-md rounded-lg p-4">
              <div className="flex justify-between items-center border-b pb-2 mb-2">
                <h3 className="text-lg font-semibold">Order ID: {order.id}</h3>
                <span className="text-gray-500 text-sm">{order.date}</span>
              </div>

              <div>
                {order.books.map((book, index) => (
                  <div key={index} className="flex items-center gap-4 mb-2">
                    <img
                      src={
                        book.image instanceof File
                          ? URL.createObjectURL(book.image)
                          : book.image
                      }
                      alt={book.bookName}
                      className="w-16 h-20 object-cover rounded-md shadow-md"
                    />
                    <div>
                      <p className="text-lg font-semibold">{book.bookName}</p>
                      <p className="text-sm text-gray-500">{book.authorName}</p>
                      <p className="text-sm font-medium">${book.price}</p>
                      <p className="text-sm text-gray-600">
                        Quantity: {book.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {orders.length === 0 && (
            <p className="text-center text-gray-500">No orders found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SalesDashboard;
