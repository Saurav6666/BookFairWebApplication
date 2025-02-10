export interface Book {
  bookName: string;
  authorName: string;
  price: number;
  bookType: string;
  image: File | null; // File object for image upload
  imageBase64: string;
}

/** Book Payload for API (Base64 Image) */
export interface BookPayload {
  bookName: string;
  authorName: string;
  price: string; // Converted to string for API
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
