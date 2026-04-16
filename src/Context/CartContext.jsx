import axios from "axios";
import { createContext, useState } from "react";

export const CartContext = createContext();
export function CartContextProvider(props) {
   let [cartCount, setCartCount] = useState(0);
  let headers = {
    token: localStorage.getItem("userToken"),
  };
  // function to display cart items 
  function getCartItems() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: headers,
      })
      .then((response) => {
        console.log(response);
        setCartCount(response.data.numOfCartItems);
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }
  // function to add item to cart
  function addToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        { headers: headers },
      )
      .then((response) => {
        console.log(response.data);
        setCartCount(response.data.numOfCartItems);
        return response;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }
  // function to remove item from cart
  function removeCartItems(productId){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
      headers:headers
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
      headers:headers
    }
    ).then((response)=>{
      return response;
    }).catch((error)=>{
      throw error
    })
  }
  return (
    <CartContext.Provider value={{ addToCart ,getCartItems,removeCartItems ,updateCartItems , cartCount}}>
      {props.children}
    </CartContext.Provider>
  );
}
