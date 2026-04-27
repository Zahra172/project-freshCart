import axios from "axios";
import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartContextProvider(props) {
  const [cartCount, setCartCount] = useState(0);
  const [TotalPrice, setTotalPrice] = useState(0);

  /** Always read token fresh from localStorage to avoid stale-token 401s */
  function getHeaders() {
    return { token: localStorage.getItem("userToken") };
  }

  /** Fetch all cart items */
  function getCartItems() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: getHeaders(),
      })
      .then((response) => {
        setCartCount(response.data.numOfCartItems);
        setTotalPrice(response.data.data.totalCartPrice);
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }

  /** Add a product to the cart */
  function addToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        { headers: getHeaders() },
      )
      .then((response) => {
        setCartCount(response.data.numOfCartItems);
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }

  /** Remove a product from the cart */
  function removeCartItems(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: getHeaders(),
      })
      .then((response) => {
        setCartCount(response.data.numOfCartItems);
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }

  /** Update quantity of a cart item */
  function updateCartItems(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers: getHeaders() },
      )
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  }

  return (
    <CartContext.Provider
      value={{ addToCart, getCartItems, removeCartItems, updateCartItems, cartCount, TotalPrice }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
