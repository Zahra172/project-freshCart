import axios from "axios";
import { createContext } from "react";

export const CartContext = createContext();
export function CartContextProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };
  function addToCart(productId) {
   return axios.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      { productId },
      { headers : headers },
    ).then((response)=>{
        console.log(response.data);
        return response;
    }).catch((error)=>{
        console.log(error);
        throw error;
    });
  }
  return (
    <CartContext.Provider value={{ addToCart }}>
      {props.children}
    </CartContext.Provider>
  );
}
