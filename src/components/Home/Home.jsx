import React, { useContext } from "react";
import RecentProducts from "../RecentProducts/RecentProducts";
import SliderCategories from "../SliderCategories/SliderCategories";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function Home() {
  const { userLogin } = useContext(UserContext);

  return (
    <div className="py-6">
      {/* ── Hero banner ──────────────────────────────────────────────── */}
      <div className="relative bg-gradient-to-br from-green-600 to-green-800 rounded-3xl overflow-hidden mb-10 px-8 py-12 md:py-16">
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-white/10" />
        <div className="absolute -bottom-8 -left-8 h-36 w-36 rounded-full bg-white/10" />

        <div className="relative z-10 max-w-lg">
          <span className="inline-block bg-white/20 text-white text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
            Fresh Deals Every Day
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
            Shop Fresh Groceries &amp; Essentials
          </h1>
          <p className="text-green-100 text-sm md:text-base mb-6 leading-relaxed">
            Discover thousands of products at great prices, delivered fast to
            your door.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("products-section")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn bg-white text-green-700 hover:bg-green-50 border-none rounded-xl font-semibold px-6"
            >
              Shop Now
            </Link>
            {!userLogin && (
              <Link
                to="/register"
                className="btn btn-outline border-white text-white hover:bg-white hover:text-green-700 rounded-xl font-semibold px-6"
              >
                Create Account
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ── Category slider ───────────────────────────────────────────── */}
      <SliderCategories />

      {/* ── Products grid ─────────────────────────────────────────────── */}
      <div id="products-section">
        <RecentProducts />
      </div>
    </div>
  );
}
