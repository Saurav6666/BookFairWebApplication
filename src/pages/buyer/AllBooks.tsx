import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { HeartIcon } from "@heroicons/react/24/outline";
import { getBooks } from "../../api-services/bookService";
import { useCart } from "../../context/CartContext";
import { Filter, Search } from "lucide-react";

interface Book {
  bookName: string;
  authorName: string;
  price: number;
  bookType: string;
  image: string;
}

const generateStarRatings = (books: Book[]): Record<string, number> => {
  const savedRatings = localStorage.getItem("bookRatings");
  const ratings: Record<string, number> = savedRatings
    ? JSON.parse(savedRatings)
    : {};

  books.forEach((book) => {
    if (!ratings[book.bookName]) {
      ratings[book.bookName] = Math.floor(Math.random() * 5) + 1; // Random between 1-5
    }
  });

  localStorage.setItem("bookRatings", JSON.stringify(ratings));
  return ratings;
};

const AllBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [bookRatings, setBookRatings] = useState<Record<string, number>>({});
  const { addToCart } = useCart();

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
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold mb-4 md:mb-0">All Books</h1>

        {/* Filter Section */}
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          {/* Search Input */}
          <div className="flex items-center border px-4 py-2 rounded-md w-full md:w-72">
            <Search className="w-4 h-4 mr-2 text-gray-500" />
            <input
              type="text"
              placeholder="Search by book name or author..."
              className="w-full text-gray-700 bg-transparent outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Book Type Dropdown */}
          <div className="flex items-center border px-4 py-2 rounded-md w-full md:w-auto">
            <Filter className="w-4 h-4 mr-2" />
            <select
              className="w-full text-gray-700 bg-transparent outline-none"
              value={bookType}
              onChange={(e) => setBookType(e.target.value)}
            >
              <option value="">All Types</option>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
                </div>

                {/* Favorite Icon */}
                <button className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
                  <HeartIcon className="w-5 h-5 text-gray-600" />
                </button>

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

                  {/* Price & Add to Cart Button */}
                  <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between">
                    <span className="text-blue-600 font-semibold mb-2 sm:mb-0">
                      ${book.price}
                    </span>
                    <button
                      className="bg-blue-600 text-white px-3 py-2 text-sm rounded hover:bg-blue-700 w-full sm:w-auto"
                      onClick={() => addToCart({ ...book, quantity: 1 })}
                    >
                      Add to Cart
                    </button>
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
