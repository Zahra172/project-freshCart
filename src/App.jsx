import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Products from "./components/Products/Products";
import Notfound from "./components/Notfound/Notfound";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Faqs from "./components/Faqs/Faqs";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartContextProvider } from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import WishList from "./components/Wishlist/WishList";
import { WishlistContextProvider } from "./Context/WishlistContext";
import AllOrders from "./components/AllOrders/AllOrders";
import Address from "./components/Address/Address";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      // ── Public routes — anyone can browse ──────────────────────────────
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "products", element: <Products /> },
      { path: "categories", element: <Categories /> },
      { path: "brands", element: <Brands /> },
      { path: "details/:id/:category", element: <ProductDetails /> },
      { path: "faqs", element: <Faqs /> },

      // ── Protected routes — require authentication ──────────────────────
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "allOrders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "address/:cartId",
        element: (
          <ProtectedRoute>
            <Address />
          </ProtectedRoute>
        ),
      },

      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <WishlistContextProvider>
        <CartContextProvider>
          <QueryClientProvider client={queryClient}>
            <UserContextProvider>
              <RouterProvider router={router} />
              <Toaster
                position="top-center"
                toastOptions={{
                  duration: 3000,
                  style: {
                    borderRadius: "10px",
                    background: "#fff",
                    color: "#1f2937",
                    border: "1px solid #e5e7eb",
                    fontSize: "14px",
                    fontWeight: "500",
                  },
                  success: {
                    iconTheme: { primary: "#16a34a", secondary: "#fff" },
                  },
                  error: {
                    style: {
                      background: "#1f2937",
                      color: "#fff",
                      border: "1px solid #374151",
                    },
                    iconTheme: { primary: "#ef4444", secondary: "#fff" },
                  },
                }}
              />
            </UserContextProvider>
          </QueryClientProvider>
        </CartContextProvider>
      </WishlistContextProvider>
    </>
  );
}

export default App;
