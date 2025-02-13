import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getBooks } from "../../api-services/bookService";
import { useCart } from "../../context/CartContext";
import { Filter, Search, ShoppingCartIcon } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { generateStarRatings } from "./Utils";
import Soldout from "../../../public/images/soldout.png";
interface Book {
  bookName: string;
  authorName: string;
  price: number;
  bookType: string;
  image: string;
  quantity: string;
}

const AllBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [bookRatings, setBookRatings] = useState<Record<string, number>>({});
  const { addToCart, removeFromCart } = useCart();
  const [addedToCart, setAddedToCart] = useState<Record<string, boolean>>({});

  const handleAddToCart = (book: Book) => {
    if (addedToCart[book.bookName]) {
      removeFromCart(book.bookName);
      toast.info(`${book.bookName} removed from cart!`);
      setAddedToCart((prev) => ({
        ...prev,
        [book.bookName]: false,
      }));
    } else {
      addToCart({ ...book, quantity: 1 });
      toast.success(`${book.bookName} added to cart successfully!`);
      setAddedToCart((prev) => ({
        ...prev,
        [book.bookName]: true,
      }));
    }
  };

  // Filter states
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [bookType, setBookType] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number>(1000);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();

        // Transform image to string if it's a File or null
        const processedData = data.map((book) => ({
          ...book,
          image:
            book.image instanceof File
              ? URL.createObjectURL(book.image)
              : (book.image ?? "https://via.placeholder.com/150"),
          quantity: book.quantity ?? 0, // Ensure quantity is set
        }));

        setBooks(processedData);
        setFilteredBooks(processedData);
        setBookRatings(generateStarRatings(processedData));
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // Handle filtering
  useEffect(() => {
    let filtered = books;

    if (searchTerm) {
      filtered = filtered.filter(
        (book) =>
          book.bookName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.authorName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (bookType) {
      filtered = filtered.filter((book) => book.bookType === bookType);
    }

    filtered = filtered.filter((book) => book.price <= priceRange);

    setFilteredBooks(filtered);
  }, [searchTerm, bookType, priceRange, books]);

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 p-4">
        <h1 className="text-2xl text-primary font-semibold mb-4 md:mb-0">
          All Books
        </h1>

        {/* Filter Section */}
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-500" />
            <input
              type="text"
              placeholder="Search by book name or author..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Book Type Dropdown */}
          <div className="flex items-center border px-4 py-2 rounded-md w-full md:w-auto">
            <Filter className="w-4 h-4 mr-2" />
            <select
              className="w-full text-gray-700 bg-transparent outline-none "
              value={bookType}
              onChange={(e) => setBookType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="Fiction">Fiction</option>
              <option value="non-fiction">Non-fiction</option>
              <option value="mystery">Mystery</option>
              <option value="sci-fi">Sci-Fi</option>
              <option value="fantasy">Fantasy</option>
              <option value="romance">Romance</option>
              <option value="history">History</option>
              <option value="biography">Biography</option>
            </select>
          </div>

          {/* Price Range Slider */}
          <div className="flex items-center w-full md:w-auto">
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full md:w-32"
            />
            <span className="text-gray-700 ml-2">${priceRange}</span>
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading books...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => (
              <div
                key={index}
                className="relative bg-white shadow-md rounded-lg overflow-hidden"
              >
                {/* Book Image */}
                <div className="p-4">
                  <img
                    src={book.image || "https://via.placeholder.com/150"}
                    alt={book.bookName}
                    className="w-full h-72 md:h-96 object-cover rounded-md"
                  />
                  {Number(book.quantity) === 0 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <img
                        src={Soldout}
                        alt="Sold Out"
                        className="w-80 h-32 object-contain"
                      />
                    </div>
                  )}
                </div>

                {/* Favorite Icon */}
                {/* <button className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
                  <HeartIcon className="w-5 h-5 text-gray-600" />
                </button> */}

                {/* Book Details */}
                <div className="p-4">
                  <h2 className="text-gray-600 text-lg font-semibold">
                    {book.bookName}{" "}
                    <span className="text-gray-400 block sm:inline">
                      by {book.authorName}
                    </span>
                  </h2>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-gray-500 text-sm">{book.bookType}</p>
                    <p className="text-yellow-500 text-lg">
                      {"★".repeat(bookRatings[book.bookName])}
                    </p>
                  </div>
                  <div className="mt-2 bg-gray-200 text-gray-700 px-3 py-1 rounded-md w-max text-sm">
                    Qty: {book.quantity}
                  </div>
                  {/* Price & Add to Cart Button */}
                  <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between">
                    <span className="text-primary font-semibold mb-2 sm:mb-0">
                      ${book.price}
                    </span>
                    {Number(book.quantity) > 0 ? (
                      <button
                        className={`px-3 py-2 text-sm rounded w-full sm:w-auto transition-all flex ${
                          addedToCart[book.bookName]
                            ? "border border-blue-600 text-blue-600 bg-white"
                            : "bg-primary text-white hover:bg-primaryDark"
                        }`}
                        onClick={() => handleAddToCart(book)}
                      >
                        <ShoppingCartIcon className="w-6 h-6 text-white" />
                        {addedToCart[book.bookName]
                          ? "Remove from Cart"
                          : "Add to Cart"}
                      </button>
                    ) : (
                      <button className="px-3 py-2 text-sm rounded w-full sm:w-auto bg-danger text-white cursor-not-allowed">
                        Sold Out
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No books available.
            </p>
          )}
        </div>
      )}
    </Layout>
  );
};

export default AllBooks;
