// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from "react";

// interface Book {
//   bookName: string;
//   authorName: string;
//   price: number;
//   bookType: string;
//   image: string;
//   quantity: number; // Added quantity property
// }

// interface CartContextType {
//   cart: Book[];
//   addToCart: (book: Book) => void;
//   updateQuantity: (bookName: string, change: number) => void;
//   removeFromCart: (bookName: string) => void;
//   clearCart: () => void; // New function
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [cart, setCart] = useState<Book[]>(() => {
//     const savedCart = localStorage.getItem("cart");
//     return savedCart ? JSON.parse(savedCart) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   const addToCart = (book: Book) => {
//     setCart((prevCart) => {
//       const existingBook = prevCart.find(
//         (item) => item.bookName === book.bookName
//       );
//       if (existingBook) {
//         return prevCart.map((item) =>
//           item.bookName === book.bookName
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...prevCart, { ...book, quantity: 1 }];
//     });
//   };

//   const updateQuantity = (bookName: string, change: number) => {
//     setCart(
//       (prevCart) =>
//         prevCart
//           .map((book) =>
//             book.bookName === bookName
//               ? { ...book, quantity: book.quantity + change }
//               : book
//           )
//           .filter((book) => book.quantity > 0) // Remove if quantity is 0
//     );
//   };
//   const clearCart = () => setCart([]); // Clear cart function
//   const removeFromCart = (bookName: string) => {
//     setCart((prevCart) =>
//       prevCart.filter((book) => book.bookName !== bookName)
//     );
//   };

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface Book {
  id: string; // Added id
  bookName: string;
  authorName: string;
  price: number;
  bookType: string;
  image: string;
  quantity: number;
  shopName?: string;
}

interface CartContextType {
  cart: Book[];
  addToCart: (book: Book) => void;
  updateQuantity: (id: string, change: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
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
        (item) => item.id === book.id // Use id instead of bookName
      );
      if (existingBook) {
        return prevCart.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...book, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, change: number) => {
    setCart(
      (prevCart) =>
        prevCart
          .map((book) =>
            book.id === id
              ? { ...book, quantity: book.quantity + change }
              : book
          )
          .filter((book) => book.quantity > 0) // Remove if quantity is 0
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((book) => book.id !== id));
  };
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}
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
