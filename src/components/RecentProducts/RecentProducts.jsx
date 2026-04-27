import { Link, useNavigate } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";
import { UserContext } from "../../Context/UserContext";
import toast from "react-hot-toast";
import ProductCardSkeleton from "../Skeleton/ProductCardSkeleton";

export default function RecentProducts() {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, wishlist } =
    useContext(WishlistContext);
  const { userLogin } = useContext(UserContext);
  const navigate = useNavigate();

  const { data, isLoading, isError, error, totalPages, page, setPage } =
    useProducts();

  // ── Auth guard helper ────────────────────────────────────────────────
  function requireAuth(action) {
    if (!userLogin) {
      toast.error("Please sign in or create an account first", {
        icon: "🔒",
        duration: 3500,
      });
      navigate("/login");
      return false;
    }
    return true;
  }

  // ── Add to cart ──────────────────────────────────────────────────────
  function addProductToCart(productId) {
    if (!requireAuth()) return;
    addToCart(productId)
      .then((response) => {
        if (response.data.status === "success") {
          toast.success("Added to cart!");
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Failed to add to cart.");
      });
  }

  // ── Toggle wishlist ──────────────────────────────────────────────────
  function toggleWishlist(productId) {
    if (!requireAuth()) return;
    const isLiked = wishlist.some(
      (item) => item._id === productId || item.id === productId,
    );
    if (isLiked) {
      removeFromWishlist(productId)
        .then(() => toast.success("Removed from wishlist"))
        .catch(() => toast.error("Something went wrong"));
    } else {
      addToWishlist(productId)
        .then(() => toast.success("Added to wishlist!"))
        .catch(() => toast.error("Something went wrong"));
    }
  }

  // ── Loading state — skeleton grid ────────────────────────────────────
  if (isLoading) {
    return (
      <div className="py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  // ── Error state ──────────────────────────────────────────────────────
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-14 w-14 text-red-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
          />
        </svg>
        <p className="text-lg font-semibold text-base-content">
          Failed to load products
        </p>
        <p className="text-sm text-base-content/60">{error?.message}</p>
      </div>
    );
  }

  const products = data?.data?.data ?? [];

  return (
    <section className="py-8">
      {/* Section header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-base-content">
          Featured Products
        </h2>
        <span className="text-sm text-base-content/60">
          Page {page} of {totalPages}
        </span>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const isLiked = wishlist.some(
            (item) => item._id === product.id || item.id === product.id,
          );
          return (
            <div
              key={product.id}
              className="group bg-base-100 border border-base-300 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="relative overflow-hidden bg-base-200">
                <Link to={`/details/${product.id}/${product.category.name}`}>
                  <img
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                    src={product.imageCover}
                    alt={product.title}
                    loading="lazy"
                  />
                </Link>
                {/* Wishlist heart button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
                  className="absolute top-3 right-3 h-8 w-8 rounded-full bg-base-100/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                >
                  <i
                    className={`fa-heart text-sm ${
                      isLiked
                        ? "fa-solid text-red-500"
                        : "fa-regular text-base-content/50"
                    }`}
                  />
                </button>
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col flex-1">
                {/* Category badge */}
                <span className="text-xs font-medium text-green-600 uppercase tracking-wide mb-1">
                  {product.category?.name}
                </span>

                {/* Title */}
                <Link
                  to={`/details/${product.id}/${product.category.name}`}
                  className="text-sm font-semibold text-base-content hover:text-green-600 transition-colors line-clamp-2 mb-2 flex-1"
                >
                  {product.title}
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <svg
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                  </svg>
                  <span className="text-xs font-medium text-base-content/70">
                    {product.ratingsAverage}
                  </span>
                  <span className="text-xs text-base-content/40">
                    ({product.ratingsQuantity})
                  </span>
                </div>

                {/* Price + Add to cart */}
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-lg font-bold text-base-content">
                    {product.price.toLocaleString()} EGP
                  </span>
                  <button
                    onClick={() => addProductToCart(product.id)}
                    className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
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
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-10">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-base-300 text-sm font-medium text-base-content hover:bg-base-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Prev
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            const pageNum = i + 1;
            return (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`h-9 w-9 rounded-lg text-sm font-medium transition-colors ${
                  page === pageNum
                    ? "bg-green-600 text-white"
                    : "border border-base-300 text-base-content hover:bg-base-200"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          {totalPages > 5 && (
            <span className="px-2 text-base-content/50">…</span>
          )}
        </div>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-base-300 text-sm font-medium text-base-content hover:bg-base-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
