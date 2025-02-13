import { BrowserRouter as Router, Routes, Route } from "react-router";
import "./App.css";
import Home from "./pages/home";
import Registration from "./pages/sign-signup/Registration";
import LoginForm from "./pages/sign-signup/LoginForm";
import ProtectedRoute from "./pages/ProtectedRoute";
import BooksList from "./pages/seller/BooksList";
import AddBook from "./pages/seller/Addbook";
import BuyerOrders from "./pages/seller/BuyerOrders";
import BookSellerProfile from "./pages/seller/Profile";
import AllBooks from "./pages/buyer/AllBooks";
import { CartProvider } from "./context/CartContext";
import MyCart from "./pages/buyer/Cart";
import { ToastContainer } from "react-toastify";
import MyOrder from "./pages/buyer/MyOrder";

function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/seller-dashboard"
            element={<ProtectedRoute role="seller" />}
          >
            <Route index element={<BuyerOrders />} />
          </Route>
          <Route index path="/books-listing" element={<BooksList />} />
          <Route
            index
            path="/add-book"
            element={
              <AddBook
                hanleRefresh={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            }
          />
          <Route index path="/seller-profile" element={<BookSellerProfile />} />

          <Route path="/home" element={<ProtectedRoute role="buyer" />}>
            <Route index element={<AllBooks />} />
          </Route>
          <Route path="/my-cart" element={<MyCart />} />
          <Route path="/my-orders" element={<MyOrder />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </CartProvider>
    </Router>
  );
}

export default App;
