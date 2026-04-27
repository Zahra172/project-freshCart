import React, { useContext, useEffect, useState } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import { CartContext } from "../../Context/CartContext";
import { UserContext } from "../../Context/UserContext";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import WishlistSkeleton from "../Skeleton/WishlistSkeleton";

export default function WishList() {
  const { getWishlistItems, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const { userLogin } = useContext(UserContext);
  const navigate = useNavigate();

  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);

  // ── Fetch wishlist ───────────────────────────────────────────────────
  useEffect(() => {
    getWishlistItems()
      .then((res) => setWishlistItems(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // ── Remove from wishlist ─────────────────────────────────────────────
  async function removeItem(productId) {
    setRemovingId(productId);
    try {
      const res = await removeFromWishlist(productId);
      setWishlistItems(res.data.data);
      toast.success("Removed from wishlist");
    } catch {
      toast.error("Failed to remove item");
    } finally {
      setRemovingId(null);
    }
  }

  // ── Move to cart ─────────────────────────────────────────────────────
  async function moveToCart(productId) {
    if (!userLogin) {
      toast.error("Please sign in or create an account first", { icon: "🔒" });
      navigate("/login");
      return;
    }
    try {
      await addToCart(productId);
      toast.success("Added to cart!");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to add to cart.");
    }
  }

  if (loading) return <WishlistSkeleton />;

  return (
    <div className="py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-base-content">
          My Wishlist
          {wishlistItems.length > 0 && (
            <span className="ml-2 text-base font-normal text-base-content/50">
              ({wishlistItems.length}{" "}
              {wishlistItems.length === 1 ? "item" : "items"})
            </span>
          )}
        </h1>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-base-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <h2 className="text-xl font-bold text-base-content">
            Your wishlist is empty
          </h2>
          <p className="text-sm text-base-content/60">
            Save items you love to your wishlist.
          </p>
          <Link
            to="/"
            className="btn bg-green-600 hover:bg-green-700 text-white border-none rounded-xl px-6"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <div
              key={product._id}
              className={`group bg-base-100 border border-base-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col ${
                removingId === product._id ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              {/* Image */}
              <div className="relative overflow-hidden bg-base-200">
                <Link to={`/details/${product._id}/${product.category?.name}`}>
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </Link>
                {/* Remove button */}
                <button
                  onClick={() => removeItem(product._id)}
                  aria-label="Remove from wishlist"
                  className="absolute top-3 right-3 h-8 w-8 rounded-full bg-base-100/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-red-50 hover:text-red-500 transition-colors text-base-content/50"
                >
                  <i className="fa-solid fa-xmark text-sm" />
                </button>
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col flex-1">
                <span className="text-xs font-medium text-green-600 uppercase tracking-wide mb-1">
                  {product.category?.name}
                </span>
                <Link
                  to={`/details/${product._id}/${product.category?.name}`}
                  className="text-sm font-semibold text-base-content hover:text-green-600 transition-colors line-clamp-2 mb-2 flex-1"
                >
                  {product.title}
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <svg
                    className="w-3.5 h-3.5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                  </svg>
                  <span className="text-xs text-base-content/60">
                    {product.ratingsAverage}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <span className="font-bold text-base-content">
                    {product.price?.toLocaleString()} EGP
                  </span>
                  <button
                    onClick={() => moveToCart(product._id)}
                    className="flex items-center gap-1 text-xs font-semibold bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                      />
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
