import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import AddBook from "./Addbook";
import { deleteBook, getBooks } from "../../api-services/bookService";
import { BookOpenIcon, TrashIcon, PencilIcon } from "@heroicons/react/16/solid";
import BookCard from "./BookCard";
import DeleteModal from "../../components/DeleteModal";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { Book } from "./Utils";
import Soldout from "../../../public/images/soldout.png";

const BooksList = () => {
  const [openModal, setOpenModal] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const [editBook, setEditBook] = useState<Book | null>(null);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Book | null;
    direction: "asc" | "desc";
  }>({
    key: null,
    direction: "asc",
  });
  const [confirmDelete, setConfirmDelete] = useState<{
    isOpen: boolean;
    bookId: string | null;
    bookName: string;
  }>({
    isOpen: false,
    bookId: null,
    bookName: "",
  });

  const fetchBooks = async () => {
    try {
      const data = await getBooks();
      const formattedData: Book[] = data.map((book) => ({
        id: book.id ?? "", // Ensure `id` exists
        bookName: book.bookName ?? "",
        authorName: book.authorName ?? "",
        bookType: book.bookType ?? "",
        price: book.price ?? 0,
        image: book.image ?? "",
        quantity: book.quantity ?? 0, // Ensure `quantity` exists
      }));
      setBooks(formattedData);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [isRefresh, confirmDelete]);

  const handleOpenModal = (book?: Book) => {
    if (book) {
      setEditBook(book);
    } else {
      setEditBook(null);
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);
  const hanleRefresh = () => {
    setIsRefresh(true);
  };

  const handleDeleteBook = async () => {
    if (confirmDelete.bookId) {
      try {
        await deleteBook(confirmDelete.bookId);
        setConfirmDelete({ isOpen: false, bookId: null, bookName: "" });
        setIsRefresh(true);
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    }
  };

  const handleSort = (key: keyof Book) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Filter and Sort Books
  const filteredBooks = [...books]
    .filter(
      (book) =>
        book.bookName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.authorName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortConfig.key) return 0;
      const valueA = a[sortConfig.key] as string | number;
      const valueB = b[sortConfig.key] as string | number;
      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortConfig.direction === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortConfig.direction === "asc"
          ? valueA - valueB
          : valueB - valueA;
      }
      return 0;
    });

  return (
    <Layout>
      <h1 className="text-2xl font-semibold  text-primary p-4">
        Welcome to the Book Listing
      </h1>

      {/* Search Input */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2 sm:gap-4 p-4">
        {/* Search Bar */}
        <div className="relative max-w-[350px] sm:w-auto flex-1">
          <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search by Book Name or Author"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        {/* Button */}
        <button
          onClick={() => handleOpenModal()}
          className="w-full sm:w-auto px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-blue-700"
        >
          Add Book
        </button>
      </div>

      {/* Table View for Desktop */}

      <div className="relative overflow-x-auto max-h-[650px]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-10">
            <tr>
              {["bookName", "authorName", "bookType", "quantity", "price"].map(
                (key) => (
                  <th
                    key={key}
                    scope="col"
                    className="px-6 py-3 cursor-pointer"
                    onClick={() => handleSort(key as keyof Book)}
                  >
                    <div className="flex items-center group relative">
                      {key.replace(/([A-Z])/g, " $1")}{" "}
                      {/* Format column names */}
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
                      <span className="absolute -top-30 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs px-2 py-1 rounded-md transition-all whitespace-nowrap">
                        {sortConfig.key === key
                          ? sortConfig.direction === "asc"
                            ? "Ascending"
                            : "Descending"
                          : "Sort"}
                      </span>
                    </div>
                  </th>
                )
              )}
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody className="overflow-y-auto">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center gap-3"
                  >
                    {book.image ? (
                      <img
                        src={
                          book.image instanceof File
                            ? URL.createObjectURL(book.image)
                            : book.image
                        }
                        alt={book.bookName}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    ) : (
                      <BookOpenIcon className="w-12 h-12 text-gray-500" />
                    )}
                    {book.bookName}
                  </th>
                  <td className="px-6 py-4">{book.authorName}</td>
                  <td className="px-6 py-4">{book.bookType}</td>
                  <td className="px-6 py-4 flex">
                    {book.quantity}
                    {Number(book.quantity) === 0 && (
                      <span>
                        <img
                          src={Soldout}
                          alt="Sold Out"
                          className="w-24 h-10 object-contain"
                        />
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">${book.price}</td>
                  <td className="px-6 py-4 flex gap-2">
                    {/* Edit Button */}
                    <div className="relative group">
                      <button
                        onClick={() => handleOpenModal(book)}
                        className="px-3 py-1 bg-primary  text-white text-xs rounded-md hover:bg-primaryDark"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs px-2 py-1 rounded-md transition-all">
                        Edit
                      </span>
                    </div>

                    {/* Delete Button */}
                    <div className="relative group">
                      <button
                        onClick={() =>
                          setConfirmDelete({
                            isOpen: true,
                            bookId: book.id,
                            bookName: book.bookName,
                          })
                        }
                        className="px-3 py-1 bg-danger text-white text-xs rounded-md hover:bg-dangerDark"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs px-2 py-1 rounded-md transition-all">
                        Delete
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center">
                  No books found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col gap-4">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              handleOpenModal={handleOpenModal}
              setConfirmDelete={setConfirmDelete}
            />
          ))
        ) : (
          <p className="text-center">No books found</p>
        )}
      </div>

      {/* Add/Edit Book Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
            <AddBook
              handleCloseModal={handleCloseModal}
              hanleRefresh={hanleRefresh}
              book={editBook}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete.isOpen && (
        <DeleteModal
          confirmDelete={confirmDelete}
          setConfirmDelete={setConfirmDelete}
          handleDeleteBook={handleDeleteBook}
        />
      )}
    </Layout>
  );
};

export default BooksList;
