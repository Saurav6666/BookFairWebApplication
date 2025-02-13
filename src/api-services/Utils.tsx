export interface Book {
  quantity: number;
  id: string;
  bookName: string;
  authorName: string;
  price: number;
  bookType: string;
  image: File | null; // File object for image upload
  imageBase64: string;
  createdAt?: string; // Optional timestamp
}

/** Book Payload for API (Base64 Image) */
export interface BookPayload {
  bookName: string;
  authorName: string;
  price: string; // Converted to string for API
  quantity: string;
  bookType: string;
  image: string; // Base64 string
  imageBase64: string;
}

/** Order Itemexport Interface */
export interface OrderItem {
  bookName: string;
  authorName: string;
  price: number;
  bookType: string;
  image: string;
  quantity: number;
}

/** Orderexport Interface */
export interface Order {
  id: string;
  books: OrderItem[];
  date: string;
}
export interface BookItem {
  id: string;
  bookName: string;
  authorName: string;
  price: number;
  bookType: string;
  image: string;
  quantity: number;
}
/** Cartexport Interface */
export interface Cart {
  items: OrderItem[];
}
