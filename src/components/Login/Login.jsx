import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";
import { WishlistContext } from "../../Context/WishlistContext";
import toast from "react-hot-toast";

export default function Login() {
  const { setUserLogin } = useContext(UserContext);
  const { getWishlistItems } = useContext(WishlistContext);
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function handleLogin(formValues) {
    setLoading(true);
    setApiError("");
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", formValues)
      .then((res) => {
        if (res.data?.message === "success") {
          localStorage.setItem("userToken", res.data.token);
          setUserLogin(res.data.token);
          // Refresh wishlist after login
          getWishlistItems().catch(() => {});
          toast.success("Welcome back!");
          navigate("/");
        }
      })
      .catch((err) => {
        setApiError(err?.response?.data?.message || "Invalid credentials");
      })
      .finally(() => setLoading(false));
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "Password must start with uppercase and be 6–10 chars",
      )
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-base-100 border border-base-300 rounded-2xl shadow-sm p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <img
              src="/src/assets/images/freshcart-logo.svg"
              alt="FreshCart"
              className="h-9 mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-base-content">
              Welcome back
            </h1>
            <p className="text-sm text-base-content/60 mt-1">
              Sign in to your account to continue
            </p>
          </div>

          {/* API error */}
          {apiError && (
            <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-xl px-4 py-3 mb-6 text-sm">
              <i className="fa-solid fa-circle-exclamation shrink-0" />
              <span>{apiError}</span>
            </div>
          )}

          <form onSubmit={formik.handleSubmit} noValidate className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-base-content mb-1.5"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="you@example.com"
                className={`w-full px-4 py-2.5 rounded-xl border bg-base-100 text-base-content text-sm outline-none transition-colors focus:ring-2 focus:ring-green-500/30 ${
                  formik.errors.email && formik.touched.email
                    ? "border-red-400 focus:border-red-400"
                    : "border-base-300 focus:border-green-500"
                }`}
              />
              {formik.errors.email && formik.touched.email && (
                <p className="mt-1.5 text-xs text-red-500">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-base-content mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  placeholder="••••••••"
                  className={`w-full px-4 py-2.5 pr-11 rounded-xl border bg-base-100 text-base-content text-sm outline-none transition-colors focus:ring-2 focus:ring-green-500/30 ${
                    formik.errors.password && formik.touched.password
                      ? "border-red-400 focus:border-red-400"
                      : "border-base-300 focus:border-green-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content/70 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <i
                    className={`fa-regular ${showPassword ? "fa-eye-slash" : "fa-eye"} text-sm`}
                  />
                </button>
              </div>
              {formik.errors.password && formik.touched.password && (
                <p className="mt-1.5 text-xs text-red-500">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-base-content/60 mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-green-600 hover:text-green-700 transition-colors"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
