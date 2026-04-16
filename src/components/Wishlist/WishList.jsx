import React, { useContext, useEffect, useState } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function WishList() {
  const { getWishlistItems, removeFromWishlist } = useContext(WishlistContext);
  const [wishlistItems, setWishlistItems] = useState([]);

  // 📥 get data
  async function getAllWishlist() {
    try {
      const response = await getWishlistItems();
      setWishlistItems(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  // ❌ remove item
  async function removeItem(productId) {
    try {
      const response = await removeFromWishlist(productId);
      setWishlistItems(response.data.data);
      toast.success("Removed from wishlist");
    } catch (error) {
      toast.error("Error removing item");
    }
  }

  useEffect(() => {
    getAllWishlist();
  }, []);

  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6">My Wishlist ❤️</h2>

      {wishlistItems.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          Your wishlist is empty 🥲
        </div>
      ) : (
        <div
          className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          gap-6
        "
        >
          {wishlistItems.map((product) => (
            <div
              key={product._id}
              className="bg-base-100 shadow rounded-lg p-4 relative"
            >
              {/* ❤️ remove button */}
              <button
                onClick={() => removeItem(product._id)}
                className="absolute top-2 right-2 btn btn-sm btn-circle bg-red-600 text-white"
              >
                <i className="fa-solid fa-heart"></i>
              </button>

              {/* image */}
              <Link to={`/details/${product._id}/${product.category.name}`}>
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              </Link>

              {/* title */}
              <h3 className="font-semibold text-sm mb-2">
                {product.title.split(" ").slice(0, 3).join(" ")}
              </h3>

              {/* price */}
              <p className="font-bold text-green-600">
                {product.price} EGP
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}