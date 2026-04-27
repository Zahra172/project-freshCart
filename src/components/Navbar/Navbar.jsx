import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { userLogin, setUserLogin } = useContext(UserContext);
  const { cartCount, getCartItems } = useContext(CartContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  // ── Theme ──────────────────────────────────────────────────────────────
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Refresh cart count whenever user logs in
  useEffect(() => {
    if (userLogin) getCartItems().catch(() => {});
  }, [userLogin]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  function logOut() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  }

  // ── Nav link helper ────────────────────────────────────────────────────
  const linkClass = ({ isActive }) =>
    `relative px-1 py-0.5 text-sm font-medium transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:scale-x-0 after:bg-green-600 after:transition-transform after:duration-200 hover:text-green-600 hover:after:scale-x-100 ${
      isActive ? "text-green-600 after:scale-x-100" : "text-base-content"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
        : "text-base-content hover:bg-base-200"
    }`;

  // ── Shared nav items ───────────────────────────────────────────────────
  const publicLinks = (
    <>
      <li>
        <NavLink to="/" end className={linkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/categories" className={linkClass}>
          Categories
        </NavLink>
      </li>
      <li>
        <NavLink to="/brands" className={linkClass}>
          Brands
        </NavLink>
      </li>
      <li>
        <NavLink to="/faqs" className={linkClass}>
          FAQs
        </NavLink>
      </li>
    </>
  );

  const authLinks = userLogin ? (
    <>
      <li>
        <NavLink to="/wishlist" className={linkClass}>
          Wishlist
        </NavLink>
      </li>
    </>
  ) : null;

  return (
    <header className="sticky top-0 z-50 bg-base-100/95 backdrop-blur-sm border-b border-base-300 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* ── Logo ──────────────────────────────────────────────────── */}
          <NavLink to="/" className="flex items-center shrink-0">
            <img
              src="/assets/images/freshcart-logo.svg"
              alt="FreshCart"
              className="h-8 w-auto"
            />
          </NavLink>

          {/* ── Desktop nav ───────────────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-5 list-none m-0 p-0">
              {publicLinks}
              {authLinks}
            </ul>
          </nav>

          {/* ── Right actions ─────────────────────────────────────────── */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="btn btn-ghost btn-circle btn-sm"
            >
              {theme === "dark" ? (
                /* Sun */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2a1 1 0 011 1v1a1 1 0 01-2 0V3a1 1 0 011-1zm0 16a1 1 0 011 1v1a1 1 0 01-2 0v-1a1 1 0 011-1zm8-8a1 1 0 010 2h-1a1 1 0 010-2h1zM4 11a1 1 0 010 2H3a1 1 0 010-2h1zm13.657-5.657a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zM7.05 16.95a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zm9.9 0a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zM5.636 6.757a1 1 0 011.414 0l.707.707A1 1 0 016.343 8.878l-.707-.707a1 1 0 010-1.414zM12 7a5 5 0 110 10A5 5 0 0112 7z" />
                </svg>
              ) : (
                /* Moon */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.14 12.94a7 7 0 01-9.19-9.19A9 9 0 1019.14 12.94z" />
                </svg>
              )}
            </button>

            {/* Cart icon — only when logged in */}
            {userLogin && (
              <NavLink
                to="/cart"
                aria-label="Cart"
                className="btn btn-ghost btn-circle btn-sm relative"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center leading-none">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </NavLink>
            )}

            {/* Auth buttons — desktop */}
            <div className="hidden md:flex items-center gap-2">
              {userLogin ? (
                <button
                  onClick={logOut}
                  className="btn btn-sm btn-outline border-green-600 text-green-600 hover:bg-green-600 hover:text-white hover:border-green-600 rounded-lg"
                >
                  Logout
                </button>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="btn btn-sm btn-ghost text-sm font-medium rounded-lg"
                  >
                    Sign in
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="btn btn-sm bg-green-600 hover:bg-green-700 text-white border-none rounded-lg"
                  >
                    Register
                  </NavLink>
                </>
              )}
            </div>

            {/* Hamburger — mobile */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
              className="btn btn-ghost btn-circle btn-sm md:hidden"
            >
              {mobileOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile drawer ───────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-base-300 bg-base-100 px-4 py-3 space-y-1">
          <ul className="list-none m-0 p-0 space-y-1">
            <li>
              <NavLink
                to="/"
                end
                className={mobileLinkClass}
                onClick={() => setMobileOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categories"
                className={mobileLinkClass}
                onClick={() => setMobileOpen(false)}
              >
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/brands"
                className={mobileLinkClass}
                onClick={() => setMobileOpen(false)}
              >
                Brands
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/faqs"
                className={mobileLinkClass}
                onClick={() => setMobileOpen(false)}
              >
                FAQs
              </NavLink>
            </li>
            {userLogin && (
              <li>
                <NavLink
                  to="/wishlist"
                  className={mobileLinkClass}
                  onClick={() => setMobileOpen(false)}
                >
                  Wishlist
                </NavLink>
              </li>
            )}
          </ul>

          <div className="pt-3 border-t border-base-300">
            {userLogin ? (
              <button
                onClick={() => {
                  logOut();
                  setMobileOpen(false);
                }}
                className="w-full btn btn-sm btn-outline border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-lg"
              >
                Logout
              </button>
            ) : (
              <div className="flex gap-2">
                <NavLink
                  to="/login"
                  className="flex-1 btn btn-sm btn-ghost rounded-lg"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign in
                </NavLink>
                <NavLink
                  to="/register"
                  className="flex-1 btn btn-sm bg-green-600 hover:bg-green-700 text-white border-none rounded-lg"
                  onClick={() => setMobileOpen(false)}
                >
                  Register
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
