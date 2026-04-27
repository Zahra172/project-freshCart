import axios from "axios";
import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartContextProvider(props) {
   let [cartCount, setCartCount] = useState(0);
   let [TotalPrice, setTotalPrice] = useState(0);
  function getHeaders() {
  return {
    token: localStorage.getItem("userToken"),
  };
}
  // function to display cart items 
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
  // function to remove item from cart
  function removeCartItems(productId){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
      headers: getHeaders()
    }
    ).then((response)=>{
      setCartCount(response.data.numOfCartItems);
      return response;
    }).catch((error)=>{
      throw error
    })
  }

   // function to update item from cart
  function updateCartItems(productId, count){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { count:count },
      {
      headers: getHeaders()
    }
    ).then((response)=>{
      return response;
    }).catch((error)=>{
      throw error
    })
  }

  return (
    <CartContext.Provider
      value={{ addToCart, getCartItems, removeCartItems, updateCartItems, cartCount, TotalPrice }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
