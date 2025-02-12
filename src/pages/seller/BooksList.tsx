import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import AddBook from "./Addbook";
import { deleteBook, getBooks } from "../../api-services/bookService";
import { BookOpenIcon, TrashIcon, PencilIcon } from "@heroicons/react/16/solid";
import BookCard from "./BookCard";
import DeleteModal from "../../components/DeleteModal";
import { Search } from "lucide-react";
import { Book } from "./Utils";

const BooksList = () => {
  const [openModal, setOpenModal] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const [editBook, setEditBook] = useState<Book | null>(null);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
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

  // Filter books based on the search query
  const filteredBooks = books.filter(
    (book) =>
      book.bookName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.authorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <h1 className="text-2xl font-semibold  text-blue-600">
        Welcome to the Book Listing
      </h1>

      {/* Search Input */}
      <div className="flex justify-between items-center mb-4">
        {/* Search Bar */}
        <div className="relative ">
          <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search by Book Name or Author"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
        >
          Add Book
        </button>
      </div>

      {/* Table View for Desktop */}
      <div className="hidden md:block ">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Book Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Author
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
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
                    <td className="px-6 py-4">${book.price}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => handleOpenModal(book)}
                        className="px-3 py-1 bg-green-600 text-white text-xs rounded-md hover:bg-green-700"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() =>
                          setConfirmDelete({
                            isOpen: true,
                            bookId: book.id,
                            bookName: book.bookName,
                          })
                        }
                        className="px-3 py-1 bg-red-600 text-white text-xs rounded-md hover:bg-red-700"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
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
