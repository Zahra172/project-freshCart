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

let queryClient = new QueryClient();
let router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
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
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "details/:id/:category",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "faqs",
        element: (
          <ProtectedRoute>
            <Faqs />
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
        path:"address/:cartId",
        element:(<ProtectedRoute>
          <Address/>
        </ProtectedRoute>)
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
              <RouterProvider router={router}></RouterProvider>
              <Toaster
                position="top-center"
                toastOptions={{
                  className:
                    "bg-white text-black dark:bg-gray-800 dark:text-white",
                  style: {
                    border: "1px solid #e5e7eb",
                  },

                  success: {
                    iconTheme: {
                      primary: "#22c55e",
                      secondary: "#fff",
                    },
                  },

                  error: {
                    style: {
                      background: "#1f2937",
                      color: "#fff",
                      border: "1px solid #374151",
                    },
                    iconTheme: {
                      primary: "#ef4444",
                      secondary: "#fff",
                    },
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
