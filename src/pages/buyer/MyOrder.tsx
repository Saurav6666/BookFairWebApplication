import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getOrders } from "../../api-services/bookService";
import { Order } from "../seller/Utils";
import { Book } from "./Utils";

const MyOrder = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const todayDate = new Date().toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = (await getOrders()) as unknown as Order[];
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
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 p-4">
        <h1 className="text-2xl font-semibold mb-4 md:mb-0 text-primary">
          My Orders
        </h1>
      </div>
      <div className="p-4">
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
                    src={book.image}
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
      </div>
    </Layout>
  );
};

export default MyOrder;
