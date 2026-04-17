import React, { use, useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Cart() {
  let { getCartItems ,removeCartItems ,updateCartItems ,TotalPrice } = useContext(CartContext);
  let [cartItems, setCartItems] = useState([]);
  let [cartId, setCartId] = useState(null);
  // function to display cart items
  function getAllCartItems() {
    getCartItems()
      .then((response) => {
        console.log("cart items: ", response.data);
        setCartItems(response.data.data.products);
        setCartId(response.data.cartId);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // function to update cart items
  async function updateAllCartItems(productId, count) {
    if(count < 1){
      removeItem(productId);
    }
    let response = await updateCartItems(productId, count);
    console.log(response);
    setCartItems(response.data.data.products);
  }
  // function to delete from cart
  async function removeItem(productId){
    let response =  await removeCartItems(productId);
    console.log(response) ;
    setCartItems(response.data.data.products);
    // setCartItems(prev => prev.filter(item => item.product._id !== productId));
  }

async function checkout() {
  // let { data } = await axios.post(
  //   `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/69e0c2dbcff7dd67a8249989`,
  //   {
  //     shippingAddress: {
  //       details: "details",
  //       phone: "01010700999",
  //       city: "Cairo",
  //     },
  //   },
  //   {
  //     params: { url: "http://localhost:5173" },
  //     headers: { token: localStorage.getItem("userToken") },
  //   }
  // );
  
  // // الـ API بيرجع session URL، تحتاجي تعملي redirect
  // if (data.session?.url) {
  //   window.location.href = data.session.url;
  // }
}
  useEffect(() => {
    getAllCartItems();
  }, []);

  return (
    <>
      <div className="overflow-x-auto bg-base-100 shadow rounded-lg border border-base-300 my-10">
        <table className="table w-full">
          {/* head */}
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th className="w-24">Image</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>

          {/* <tbody>
      <tr className="hover">
        <td>
          <img
            src="/docs/images/products/apple-watch.png"
            className="w-16 rounded"
            alt="Apple Watch"
          />
        </td>

        <td className="font-semibold">Apple Watch</td>

        <td>
          <div className="flex items-center gap-2">
            <button className="btn btn-xs btn-circle">-</button>
            <span className="w-6 text-center">1</span>
            <button className="btn btn-xs btn-circle">+</button>
          </div>
        </td>

        <td className="font-bold">599 EGP</td>

        <td>
          <button className="btn btn-sm btn-error btn-outline">
            Remove
          </button>
        </td>
      </tr>
      <tr className="hover">
        <td>
          <img
            src="/docs/images/products/imac.png"
            className="w-16 rounded"
            alt="iMac"
          />
        </td>

        <td className="font-semibold">iMac 27"</td>

        <td>
          <div className="flex items-center gap-2">
            <button className="btn btn-xs btn-circle">-</button>
            <span className="w-6 text-center">1</span>
            <button className="btn btn-xs btn-circle">+</button>
          </div>
        </td>

        <td className="font-bold">2499 EGP</td>

        <td>
          <button className="btn btn-sm btn-error btn-outline">
            Remove
          </button>
        </td>
      </tr>
    </tbody> */}

          <tbody>
            {cartItems?.map((item) => (
              <tr key={item._id} className="hover">
                {/* image */}
                <td>
                  <img
                    src={item.product.imageCover}
                    className="w-16 rounded"
                    alt={item.product.title}
                  />
                </td>

                {/* title */}
                <td className="font-semibold">
                  {item.product.title.split(" ").slice(0, 2).join(" ")}
                </td>

                {/* quantity */}
                <td>
                  <div className="flex items-center gap-2">
                    <button className="btn btn-xs btn-circle" onClick={()=>updateAllCartItems(item.product.id, item.count-1)}>-</button>
                    <span className="w-6 text-center">{item.count}</span>
                    <button className="btn btn-xs btn-circle" onClick={()=>updateAllCartItems(item.product.id, item.count+1)}>+</button>
                  </div>
                </td>

                {/* price */}
                <td className="font-bold">{item.price} EGP</td>

                {/* remove */}
                <td>
                  <button onClick= {()=>removeItem(item.product._id)} className="btn cursor-pointer btn-sm btn-error btn-circle text-white bg-red-600">
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-8 my-4 items-center mt-6">
        <h2 className="text-2xl font-bold">Total Price: {TotalPrice} EGP</h2>
        <Link to={'/address/' + cartId}   className="btn btn-lg px-4 text-white bg-green-600 hover:bg-green-700">Checkout</Link>
      </div>
    </>
  );
}
