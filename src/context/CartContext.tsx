import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface Book {
  bookName: string;
  authorName: string;
  price: number;
  bookType: string;
  image: string;
  quantity: number; // Added quantity property
}

interface CartContextType {
  cart: Book[];
  addToCart: (book: Book) => void;
  updateQuantity: (bookName: string, change: number) => void;
  removeFromCart: (bookName: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Book[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (book: Book) => {
    setCart((prevCart) => {
      const existingBook = prevCart.find(
        (item) => item.bookName === book.bookName
      );
      if (existingBook) {
        return prevCart.map((item) =>
          item.bookName === book.bookName
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...book, quantity: 1 }];
    });
  };

  const updateQuantity = (bookName: string, change: number) => {
    setCart(
      (prevCart) =>
        prevCart
          .map((book) =>
            book.bookName === bookName
              ? { ...book, quantity: book.quantity + change }
              : book
          )
          .filter((book) => book.quantity > 0) // Remove if quantity is 0
    );
  };

  const removeFromCart = (bookName: string) => {
    setCart((prevCart) =>
      prevCart.filter((book) => book.bookName !== bookName)
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
