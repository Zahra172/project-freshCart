import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const WishlistContext = createContext();

export function WishlistContextProvider(props) {
  const [wishlist, setWishlist] = useState([]);

  /** Always read token fresh from localStorage to avoid stale-token 401s */
  function getHeaders() {
    return { token: localStorage.getItem("userToken") };
  }

  /** Fetch wishlist items — silently fails when user is not logged in */
  function getWishlistItems() {
    const token = localStorage.getItem("userToken");
    if (!token) return Promise.resolve({ data: { data: [] } });

    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers: getHeaders(),
      })
      .then((response) => {
        setWishlist(response.data.data);
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }

  /** Add a product to the wishlist */
  function addToWishlist(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId },
        { headers: getHeaders() },
      )
      .then((response) => {
        getWishlistItems();
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }

  /** Remove a product from the wishlist */
  function removeFromWishlist(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: getHeaders(),
      })
      .then((response) => {
        getWishlistItems();
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }

  // Only auto-fetch if user is already logged in
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      getWishlistItems();
    }
  }, []);

  return (
    <WishlistContext.Provider
      value={{ wishlist, getWishlistItems, addToWishlist, removeFromWishlist }}
    >
      {props.children}
    </WishlistContext.Provider>
  );
}
