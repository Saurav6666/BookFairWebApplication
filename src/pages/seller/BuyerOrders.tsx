import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Search, Trash2 } from "lucide-react";
import Layout from "../../components/Layout";
import { getOrders, deleteOrder } from "../../api-services/bookService";
import { Book, Order } from "./Utils";
import DeleteModal from "../../components/DeleteModal";
import OrdersMobileView from "../../components/MobileView";

const SalesDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc" | null;
  }>({ key: "", direction: null });
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

  const handleSort = (key: string) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedOrders = [...orders].sort((a, b) => {
    if (!sortConfig.direction) return 0;

    let valueA, valueB;

    if (sortConfig.key === "bookName") {
      valueA = a.books[0]?.bookName || "";
      valueB = b.books[0]?.bookName || "";
    } else if (sortConfig.key === "price") {
      valueA = a.books.reduce((total, book) => total + book.price, 0); // Sum of all book prices
      valueB = b.books.reduce((total, book) => total + book.price, 0);
    } else {
      valueA = a[sortConfig.key];
      valueB = b[sortConfig.key];
    }

    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortConfig.direction === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    if (typeof valueA === "number" && typeof valueB === "number") {
      return sortConfig.direction === "asc" ? valueA - valueB : valueB - valueA;
    }

    return 0;
  });

  return (
    <Layout>
      {/* Header Section with Search Input */}
      <div className="flex justify-between items-center mb-6  text-primary ">
        <h2 className="text-2xl font-semibold">Orders</h2>
        <div className="flex gap-2 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-500" />
            <input
              type="text"
              placeholder="Search by Book Name or Author"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* Responsive Table for Large Screens */}

      <div className="hidden md:block bg-white shadow-md rounded-lg overflow-x-auto max-h-[650px]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-10">
            <tr>
              {[
                "orderId",
                "date",
                "bookName",
                "bookCover",
                "authorName",
                "price",
                "quantity",
              ].map((key) => (
                <th
                  key={key}
                  scope="col"
                  className="px-6 py-3 cursor-pointer"
                  onClick={() => handleSort(key as keyof Book)}
                >
                  <div className="flex items-center group relative">
                    {key.replace(/([A-Z])/g, " $1")} {/* Format column names */}
                    <div className="ml-1 flex flex-col">
                      <ChevronUp
                        className={`w-4 h-4 transition-opacity ${
                          sortConfig.key === key &&
                          sortConfig.direction === "asc"
                            ? "opacity-100 text-primary"
                            : "opacity-50 text-gray-400"
                        }`}
                      />
                      <ChevronDown
                        className={`w-4 h-4 transition-opacity ${
                          sortConfig.key === key &&
                          sortConfig.direction === "desc"
                            ? "opacity-100 text-primary"
                            : "opacity-50 text-gray-400"
                        }`}
                      />
                    </div>
                    {/* Tooltip */}
                    <span className="absolute -top-30 right-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs px-2 py-1 rounded-md transition-all whitespace-nowrap">
                      {sortConfig.key === key
                        ? sortConfig.direction === "asc"
                          ? "Ascending"
                          : "Descending"
                        : "Sort"}
                    </span>
                  </div>
                </th>
              ))}
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          {sortedOrders.length > 0 ? (
            <tbody>
              {sortedOrders.map((order) => (
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
                    <td className="p-4">
                      <button
                        onClick={() =>
                          setConfirmDelete({
                            isOpen: true,
                            bookId: order.id,
                            bookName: order.books[0]?.bookName || "Unknown",
                          })
                        }
                        className="bg-danger text-white p-2 rounded-md hover:bg-dangerDark relative group"
                      >
                        <Trash2 className="w-5 h-5" />
                        <span className="absolute left-1/2 transform -translate-x-1/2 top-[-30px] bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          Delete
                        </span>
                      </button>
                    </td>
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

      <OrdersMobileView orders={orders} setConfirmDelete={setConfirmDelete} />

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
