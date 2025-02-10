export interface Book {
  bookName: string;
  authorName: string;
  price: number;
  bookType: string;
  image: string | File | null; // Allow File or null
  quantity?: number; // Optional, for cart functionality
}
