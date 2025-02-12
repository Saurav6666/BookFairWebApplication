export interface Book {
  bookName: string;
  authorName: string;
  price: number;
  bookType: string;
  image: string | File | null; // Allow File or null
  quantity?: number; // Optional, for cart functionality
}
//extra function for rating
export const generateStarRatings = (books: Book[]): Record<string, number> => {
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
