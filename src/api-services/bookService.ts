// services/bookService.ts
import axiosInstance from './axiosInstance';
import { Book, BookItem, BookPayload, Cart, Order } from './Utils';


const getBooks = async (): Promise<Book[]> => {
  try {
    const response = await axiosInstance.get('/books');
    const books = response.data;

    return books.sort((a: Book, b: Book) => 
      new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};



const addBook = async (book: BookPayload): Promise<Book> => {
  try {
    const response = await axiosInstance.post("/books", {
      bookName: book.bookName,
      authorName: book.authorName,
      price: book.price.toString(),
      quantity:book.quantity.toString(),
      bookType: book.bookType,
      image: book.imageBase64, // Send as Base64
      createdAt: new Date().toISOString()
    });

    return response.data;
  } catch (error) {
    console.error("Error adding book:", error);
    throw error;
  }
};

const deleteBook = async (bookId: string): Promise<{ message: string }> => {
  try {
    const response = await axiosInstance.delete(`/books/${bookId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};
const updateBook = async (bookId: string, updatedBook: BookPayload): Promise<Book> => {
  try {
    const response = await axiosInstance.put(`/books/${bookId}`, {
      bookName: updatedBook.bookName,
      authorName: updatedBook.authorName,
      price: updatedBook.price.toString(),
      quantity:updatedBook.quantity.toString(),
      bookType: updatedBook.bookType,
      image: updatedBook.imageBase64, // Send as Base64
    });

    return response.data;
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};


const order = async (cart: Cart): Promise<Order> => {
  try {
    if (!Array.isArray(cart.items)) {
      console.error("Invalid cart data:", cart);
      throw new Error("Cart data is not an array");
    }

    // Step 1: Aggregate Books
    const orderData: Record<string, BookItem> = cart.items.reduce((acc, book) => {
      const { bookName, authorName, price, bookType, image, quantity, id } = book;

      // Ensure quantity is a number
      const bookQuantity = Number(quantity) || 1;

      if (!acc[id]) {
        acc[id] = {
          id, // Add bookId to identify the book
          bookName,
          authorName,
          price,
          bookType,
          image,
          quantity: bookQuantity,
        };
      } else {
        acc[id].quantity += bookQuantity;
      }

      return acc;
    }, {} as Record<string, BookItem>);

    // Convert object to array
    const orderArray = Object.values(orderData);

    // Step 2: Place Order
    const response = await axiosInstance.post("/orders", { books: orderArray });

    // Step 3: Update Book Quantities in Database
    await Promise.all(orderArray.map(async (book) => {
      try {
        // Fetch the current book details
        const existingBook = await axiosInstance.get(`/books/${book.id}`);

        // Calculate new quantity
        const updatedQuantity = Math.max(0, existingBook.data.quantity - book.quantity);

        // Update book quantity in database
        await axiosInstance.patch(`/books/${book.id}`, { quantity: updatedQuantity });
      } catch (error) {
        console.error(`Error updating quantity for book ${book.id}:`, error);
      }
    }));

    return response.data;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};

const getOrders = async (): Promise<Order[]> => {
  try {
    const response = await axiosInstance.get<Order[]>("/orders");
    const orders = response.data.map(order => ({
      ...order,
      date: order.date || new Date().toISOString().split("T")[0] // Default to today's date if missing
    }));
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};
const deleteOrder = async (orderId: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/orders/${orderId}`);
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
};

export { getBooks, addBook,deleteBook ,updateBook,order ,getOrders,deleteOrder};
