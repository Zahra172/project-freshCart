import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-base-200 border-t border-base-300 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="space-y-4">
            <img
              src="/src/assets/images/freshcart-logo.svg"
              alt="FreshCart"
              className="h-8 w-auto"
            />
            <p className="text-sm text-base-content/70 leading-relaxed">
              Your one-stop shop for fresh groceries and everyday essentials,
              delivered fast to your door.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="#"
                aria-label="Twitter"
                className="text-base-content/50 hover:text-green-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="text-base-content/50 hover:text-green-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="text-base-content/50 hover:text-green-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-base-content mb-4">
              Shop
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "Home", to: "/" },
                { label: "Categories", to: "/categories" },
                { label: "Brands", to: "/brands" },
                { label: "Cart", to: "/cart" },
                { label: "Wishlist", to: "/wishlist" },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-base-content/70 hover:text-green-600 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-base-content mb-4">
              Company
            </h3>
            <ul className="space-y-2.5">
              {["About Us", "Careers", "Press", "Blog", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-base-content/70 hover:text-green-600 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Support column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-base-content mb-4">
              Support
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "FAQs", to: "/faqs" },
                { label: "Shipping Policy", to: "#" },
                { label: "Returns", to: "#" },
                { label: "Privacy Policy", to: "#" },
                { label: "Terms of Service", to: "#" },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-base-content/70 hover:text-green-600 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-base-300 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-base-content/50">
            © {new Date().getFullYear()} FreshCart. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-base-content/50">
              Secure payments via
            </span>
            <div className="flex items-center gap-2">
              {/* Visa placeholder */}
              <span className="px-2 py-0.5 bg-base-300 rounded text-xs font-bold text-base-content/60">
                VISA
              </span>
              <span className="px-2 py-0.5 bg-base-300 rounded text-xs font-bold text-base-content/60">
                MC
              </span>
              <span className="px-2 py-0.5 bg-base-300 rounded text-xs font-bold text-base-content/60">
                Stripe
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
