import React from "react";
import { Trash2 } from "lucide-react";
import { Order } from "./Utils";

interface OrdersMobileViewProps {
  orders: Order[];
  setConfirmDelete: (confirm: {
    isOpen: boolean;
    bookId: string | null;
    bookName: string;
  }) => void;
}

const OrdersMobileView: React.FC<OrdersMobileViewProps> = ({
  orders,
  setConfirmDelete,
}) => {
  return (
    <div className="md:hidden space-y-4">
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id} className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Order ID: {order.id}</h3>
              <button
                onClick={() =>
                  setConfirmDelete({
                    isOpen: true,
                    bookId: order.id,
                    bookName: order.books[0]?.bookName || "Unknown",
                  })
                }
                className="bg-danger text-white p-2 rounded-md hover:bg-dangerDark"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-500">Date: {order.date}</p>
            {order.books.map((book, index) => (
              <div key={index} className="flex items-center gap-4 mt-2">
                <img
                  src={book.image}
                  alt={book.bookName}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div>
                  <p className="font-semibold">{book.bookName}</p>
                  <p className="text-sm text-gray-500">
                    Author: {book.authorName}
                  </p>
                  <p className="text-sm font-semibold">${book.price}</p>
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No orders found.</p>
      )}
    </div>
  );
};

export default OrdersMobileView;
