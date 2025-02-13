import React, { useEffect, useState } from "react";
import { Search, Trash2 } from "lucide-react";
import Layout from "../../components/Layout";
import { getOrders, deleteOrder } from "../../api-services/bookService";
import { Book, Order } from "./Utils";
import DeleteModal from "../../components/DeleteModal";

const SalesDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [confirmDelete, setConfirmDelete] = useState<{
    isOpen: boolean;
    bookId: string | null;
    bookName: string;
  }>({
    isOpen: false,
    bookId: null,
    bookName: "",
  });

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

  const handleDeleteOrder = async () => {
    if (!confirmDelete.bookId) return;

    try {
      await deleteOrder(confirmDelete.bookId);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== confirmDelete.bookId)
      );
      setConfirmDelete({ isOpen: false, bookId: null, bookName: "" });
    } catch (error) {
      console.error("Failed to delete order:", error);
    }
  };

  // Filtered orders based on search input
  const filteredOrders = orders.filter((order) =>
    order.books.some(
      (book) =>
        book.bookName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.authorName.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Layout>
      {/* Header Section with Search Input */}
      <div className="flex justify-between items-center mb-6  text-blue-600 ">
        <h2 className="text-2xl font-semibold">Orders</h2>
        <div className="flex gap-2 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-500" />
            <input
              type="text"
              placeholder="Search by Book Name or Author"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Responsive Table for Large Screens */}

      <div className="hidden md:block bg-white shadow-md rounded-lg overflow-x-auto max-h-[650px]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-10">
            <tr>
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Books Name</th>
              <th className="p-4 text-left">Book Cover</th>
              <th className="p-4 text-left">Author Name</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Quantity</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          {filteredOrders.length > 0 ? (
            <tbody>
              {filteredOrders.map((order) => (
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
                  <td className="p-4">
                    <button
                      onClick={() =>
                        setConfirmDelete({
                          isOpen: true,
                          bookId: order.id,
                          bookName: order.books[0]?.bookName || "Unknown",
                        })
                      }
                      className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={8} className="p-4 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>

      {/* Card View for Mobile Screens */}
      <div className="md:hidden space-y-4">
        {filteredOrders.map((order) => (
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

      {confirmDelete.isOpen && (
        <DeleteModal
          confirmDelete={confirmDelete}
          setConfirmDelete={setConfirmDelete}
          handleDeleteBook={handleDeleteOrder}
        />
      )}
    </Layout>
  );
};

export default SalesDashboard;
