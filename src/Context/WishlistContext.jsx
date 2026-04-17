import axios from "axios";
import { createContext, useState ,useEffect } from "react";

export const WishlistContext = createContext();
export function WishlistContextProvider(props) {
   const [wishlist, setWishlist] = useState([]);
    let headers = {
        token: localStorage.getItem("userToken"),
      };

      function getWishlistItems() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
          headers: headers,
        })
          .then((response) => {
            console.log(response);
            setWishlist(response.data.data);
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
            getWishlistItems();
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
             getWishlistItems(); 
            return response;
          }).catch((error)=>{
            throw error })
      }
      useEffect(() => {
    getWishlistItems(); 
  }, []);
return(
    <WishlistContext.Provider value={{wishlist, getWishlistItems, addToWishlist, removeFromWishlist}}>
        {props.children}
    </WishlistContext.Provider>
)
}