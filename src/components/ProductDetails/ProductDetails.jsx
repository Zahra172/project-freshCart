import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";
import { UserContext } from "../../Context/UserContext";
import toast from "react-hot-toast";
import ProductDetailsSkeleton from "../Skeleton/ProductDetailsSkeleton";

export default function ProductDetails() {
  const { id, category } = useParams();
  const navigate = useNavigate();
  const [prodDetails, setProdDetails] = useState(null);
  const [relatedProd, setRelatedProd] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, wishlist } =
    useContext(WishlistContext);
  const { userLogin } = useContext(UserContext);

  const isLiked = wishlist.some(
    (item) => item._id === id || item.id === id,
  );

  // ── Auth guard ───────────────────────────────────────────────────────
  function requireAuth() {
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
      .then((res) => {
        if (res.data.status === "success") toast.success("Added to cart!");
      })
      .catch((err) =>
        toast.error(err?.response?.data?.message || "Failed to add to cart."),
      );
  }

  // ── Toggle wishlist ──────────────────────────────────────────────────
  async function toggleWishlist(productId) {
    if (!requireAuth()) return;
    try {
      if (isLiked) {
        await removeFromWishlist(productId);
        toast.success("Removed from wishlist");
      } else {
        await addToWishlist(productId);
        toast.success("Added to wishlist!");
      }
    } catch {
      toast.error("Something went wrong");
    }
  }

  // ── Data fetching ────────────────────────────────────────────────────
  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`),
      axios.get(`https://ecommerce.routemisr.com/api/v1/products`),
    ])
      .then(([detailsRes, allRes]) => {
        setProdDetails(detailsRes.data.data);
        setRelatedProd(
          allRes.data.data.filter((p) => p.category.name === category),
        );
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id, category]);

  // ── Slider configs ───────────────────────────────────────────────────
  const imageSliderSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const relatedSliderSettings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 640, settings: { slidesToShow: 2 } },
      { breakpoint: 400, settings: { slidesToShow: 1 } },
    ],
  };

  if (loading) return <ProductDetailsSkeleton />;

  return (
    <div className="py-10">
      {/* ── Main product section ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Image slider */}
        <div className="bg-base-200 rounded-2xl overflow-hidden p-4">
          <Slider {...imageSliderSettings}>
            {prodDetails?.images?.map((src, index) => (
              <div key={index}>
                <img
                  className="w-full h-80 object-contain rounded-xl"
                  src={src}
                  alt={`${prodDetails?.title} - ${index + 1}`}
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Product info */}
        <div className="space-y-5 py-2">
          {/* Category badge */}
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-green-600 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">
            {prodDetails?.category?.name}
          </span>

          {/* Title */}
          <h1 className="text-2xl font-bold text-base-content leading-snug">
            {prodDetails?.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(prodDetails?.ratingsAverage)
                      ? "text-yellow-400"
                      : "text-base-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-medium text-base-content">
              {prodDetails?.ratingsAverage}
            </span>
            <span className="text-sm text-base-content/50">
              ({prodDetails?.ratingsQuantity} reviews)
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-base-content/70 leading-relaxed">
            {prodDetails?.description}
          </p>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-base-content">
              {prodDetails?.price?.toLocaleString()} EGP
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => addProductToCart(prodDetails?.id)}
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              <svg
                className="w-5 h-5"
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

            <button
              onClick={() => toggleWishlist(prodDetails?.id)}
              aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
              className={`h-12 w-12 rounded-xl border-2 flex items-center justify-center transition-colors ${
                isLiked
                  ? "border-red-400 bg-red-50 dark:bg-red-900/20 text-red-500"
                  : "border-base-300 hover:border-red-400 hover:text-red-400 text-base-content/50"
              }`}
            >
              <i
                className={`fa-heart text-lg ${
                  isLiked ? "fa-solid" : "fa-regular"
                }`}
              />
            </button>
          </div>

          {/* Meta info */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            {[
              { label: "Brand", value: prodDetails?.brand?.name || "—" },
              { label: "Sold", value: `${prodDetails?.sold ?? 0} units` },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-base-200 rounded-xl px-4 py-3"
              >
                <p className="text-xs text-base-content/50 mb-0.5">{label}</p>
                <p className="text-sm font-semibold text-base-content">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Related products ─────────────────────────────────────────── */}
      {relatedProd.length > 0 && (
        <div className="mt-14">
          <h2 className="text-xl font-bold text-base-content mb-6">
            You May Also Like
          </h2>
          <Slider {...relatedSliderSettings}>
            {relatedProd.map((product) => (
              <div key={product.id} className="px-2">
                <Link
                  to={`/details/${product.id}/${product.category.name}`}
                  className="block bg-base-100 border border-base-300 rounded-xl overflow-hidden hover:shadow-md transition-shadow group"
                >
                  <img
                    className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                    src={product.imageCover}
                    alt={product.title}
                    loading="lazy"
                  />
                  <div className="p-3">
                    <p className="text-xs font-semibold text-base-content line-clamp-2 mb-1">
                      {product.title.split(" ").slice(0, 3).join(" ")}
                    </p>
                    <p className="text-sm font-bold text-green-600">
                      {product.price.toLocaleString()} EGP
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
}
