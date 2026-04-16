import axios from "axios";
import { createContext } from "react";

export const WishlistContext = createContext();
export function WishlistContextProvider(props) {
    let headers = {
        token: localStorage.getItem("userToken"),
      };

      function getWishlistItems() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
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

      function addToWishlist(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { productId }, {
            headers: headers,
            })
        .then((response) => {
            console.log(response.data);
            return response;
            })
        .catch((error) => {
            console.log(error);
            throw error;
        })};
      function removeFromWishlist(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
          { headers:headers }
          ).then((response)=>{
            return response;
          }).catch((error)=>{
            throw error })
      }
return(
    <WishlistContext.Provider value={{getWishlistItems, addToWishlist, removeFromWishlist}}>
        {props.children}
    </WishlistContext.Provider>
)
}