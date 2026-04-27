import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import CartSkeleton from "../Skeleton/CartSkeleton";
import toast from "react-hot-toast";

export default function Cart() {
  const { getCartItems, removeCartItems, updateCartItems, TotalPrice } =
    useContext(CartContext);
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null); // track which item is updating

  // ── Fetch cart ───────────────────────────────────────────────────────
  useEffect(() => {
    getCartItems()
      .then((res) => {
        setCartItems(res.data.data.products);
        setCartId(res.data.cartId);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // ── Update quantity ──────────────────────────────────────────────────
  async function updateItem(productId, count) {
    if (count < 1) {
      removeItem(productId);
      return;
    }
    setUpdatingId(productId);
    try {
      const res = await updateCartItems(productId, count);
      setCartItems(res.data.data.products);
    } catch {
      toast.error("Failed to update quantity");
    } finally {
      setUpdatingId(null);
    }
  }

  // ── Remove item ──────────────────────────────────────────────────────
  async function removeItem(productId) {
    setUpdatingId(productId);
    try {
      const res = await removeCartItems(productId);
      setCartItems(res.data.data.products);
      toast.success("Item removed from cart");
    } catch {
      toast.error("Failed to remove item");
    } finally {
      setUpdatingId(null);
    }
  }

  if (loading) return <CartSkeleton />;

  if (!cartItems || cartItems.length === 0) {
    return (
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
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <h2 className="text-xl font-bold text-base-content">
          Your cart is empty
        </h2>
        <p className="text-sm text-base-content/60">
          Looks like you haven't added anything yet.
        </p>
        <Link
          to="/"
          className="btn bg-green-600 hover:bg-green-700 text-white border-none rounded-xl px-6"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10">
      <h1 className="text-2xl font-bold text-base-content mb-8">
        Shopping Cart
        <span className="ml-2 text-base font-normal text-base-content/50">
          ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
        </span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── Cart items ─────────────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className={`flex gap-4 bg-base-100 border border-base-300 rounded-2xl p-4 transition-opacity ${
                updatingId === item.product._id ||
                updatingId === item.product.id
                  ? "opacity-60 pointer-events-none"
                  : ""
              }`}
            >
              {/* Image */}
              <img
                src={item.product.imageCover}
                alt={item.product.title}
                className="h-24 w-24 object-cover rounded-xl shrink-0 bg-base-200"
              />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-base-content line-clamp-2 mb-1">
                  {item.product.title}
                </h3>
                <p className="text-xs text-base-content/50 mb-3">
                  {item.product.category?.name}
                </p>

                <div className="flex items-center justify-between flex-wrap gap-3">
                  {/* Qty controls */}
                  <div className="flex items-center gap-2 bg-base-200 rounded-lg p-1">
                    <button
                      onClick={() =>
                        updateItem(item.product.id, item.count - 1)
                      }
                      className="h-7 w-7 rounded-md bg-base-100 hover:bg-base-300 flex items-center justify-center text-base-content font-bold transition-colors"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm font-semibold text-base-content">
                      {item.count}
                    </span>
                    <button
                      onClick={() =>
                        updateItem(item.product.id, item.count + 1)
                      }
                      className="h-7 w-7 rounded-md bg-base-100 hover:bg-base-300 flex items-center justify-center text-base-content font-bold transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Price */}
                  <span className="font-bold text-base-content">
                    {(item.price * item.count).toLocaleString()} EGP
                  </span>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.product._id)}
                    aria-label="Remove item"
                    className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition-colors"
                  >
                    <i className="fa-solid fa-trash text-xs" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Order summary ──────────────────────────────────────────── */}
        <div className="lg:col-span-1">
          <div className="bg-base-100 border border-base-300 rounded-2xl p-6 sticky top-24">
            <h2 className="text-lg font-bold text-base-content mb-5">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-base-content/70">
                <span>Subtotal</span>
                <span>{TotalPrice?.toLocaleString()} EGP</span>
              </div>
              <div className="flex justify-between text-base-content/70">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="border-t border-base-300 pt-3 flex justify-between font-bold text-base-content text-base">
                <span>Total</span>
                <span>{TotalPrice?.toLocaleString()} EGP</span>
              </div>
            </div>

            <Link
              to={`/address/${cartId}`}
              className="mt-6 w-full btn bg-green-600 hover:bg-green-700 text-white border-none rounded-xl font-semibold"
            >
              Proceed to Checkout
            </Link>

            <Link
              to="/"
              className="mt-3 w-full btn btn-ghost rounded-xl text-sm text-base-content/70"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
