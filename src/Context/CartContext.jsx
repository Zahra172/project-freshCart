import axios from "axios";
import { createContext } from "react";

export const CartContext = createContext();
export function CartContextProvider(props) {
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
      return response;
    }).catch((error)=>{
      throw error
    })
  }
  return (
    <CartContext.Provider value={{ addToCart ,getCartItems,removeCartItems }}>
      {props.children}
    </CartContext.Provider>
  );
}
