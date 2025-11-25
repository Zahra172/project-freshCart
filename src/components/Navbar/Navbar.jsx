import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function Navbar() {
  let navigate = useNavigate();
  let { userLogin, setUserLogin } = useContext(UserContext);
  function logOut() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  }
  // نحدد الثيم أول مرة بناءً على:
  // 1) LocalStorage
  // 2) لو فاضي → ثيم الجهاز
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;

    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return systemDark ? "dark" : "light";
  });

  // كل ما الثيم يتغير → نحدث الـ DOM و LocalStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // دالة تغيير الثيم
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-3">
          <a className="btn btn-ghost text-xl">
            <img
              alt="website logo"
              src="/src/assets/images/freshcart-logo.svg"
            />
          </a>
        </div>

        <div className="flex-1">
          <ul className="menu menu-horizontal px-1 hidden md:flex">
            {userLogin !== null ? (
              <>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/products">Products</NavLink>
                </li>
                <li>
                  <NavLink to="/brands">Brands</NavLink>
                </li>
                <li>
                  <NavLink to="/categories">Categories</NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="flex-none">
          {/* زر تغيير الثيم Sun / Moon */}
          <label className="swap swap-rotate mx-3">
            <input
              type="checkbox"
              onChange={toggleTheme}
              checked={theme === "dark"}
            />

            {/* sun icon */}
            <svg
              className="swap-on fill-current w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64 17l-.71-.71 1.41-1.41.71.71zM1 13h3v-2H1zm10-8h2V1h-2zm8 8h3v-2h-3zM12 23h2v-3h-2zM17.66 7.05l1.41-1.41-.7-.71-1.42 1.41zM7.05 6.34L5.64 4.93l-.71.71 1.41 1.41z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-off fill-current w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M19.14 12.94a7 7 0 01-9.19-9.19A9 9 0 1019.14 12.94z" />
            </svg>
          </label>

          {/* باقي العناصر */}
          <div className="dropdown dropdown-end">
            {userLogin !==null ?<>
             <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              
              <div className="indicator">
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
                <span className="badge badge-sm indicator-item">8</span>
              </div>
            </div>
            </>:<></>}
           
          </div>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {userLogin !== null ? (
                <>
                  <li>
                    <NavLink to="/" className="justify-between">
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/products"
                      className={({ isActive }) =>
                        isActive ? "text-green-900 font-bold" : ""
                      }
                    >
                      Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/brands">Brands</NavLink>
                  </li>
                  <li>
                    <NavLink to="/categories">Categories</NavLink>
                  </li>
                  <li>
                    <NavLink to="/faqs">FAQS</NavLink>
                  </li>
                  <li>
                    <span to="/products" className="cursor-pointer" onClick={logOut}>
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                  <li>
                    <NavLink to="/register">Register</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
