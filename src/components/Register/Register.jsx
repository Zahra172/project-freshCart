import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";
import toast from "react-hot-toast";

export default function Register() {
  const { setUserLogin } = useContext(UserContext);
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const navigate = useNavigate();

  function handleRegister(formValues) {
    setLoading(true);
    setApiError("");
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", formValues)
      .then((res) => {
        if (res.data?.message === "success") {
          localStorage.setItem("userToken", res.data.token);
          setUserLogin(res.data.token);
          toast.success("Account created! Welcome to FreshCart.");
          navigate("/");
        }
      })
      .catch((err) => {
        setApiError(
          err?.response?.data?.message || "Registration failed. Try again.",
        );
      })
      .finally(() => setLoading(false));
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(15, "Name must be at most 15 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number")
      .required("Phone is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "Must start with uppercase and be 6–10 chars",
      )
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
  });

  const formik = useFormik({
    initialValues: { name: "", email: "", phone: "", password: "", rePassword: "" },
    validationSchema,
    onSubmit: handleRegister,
  });

  // Reusable field component
  function Field({ id, label, type = "text", placeholder, autoComplete, rightElement }) {
    const hasError = formik.errors[id] && formik.touched[id];
    return (
      <div>
        <label
          htmlFor={id}
          className="block text-sm font-medium text-base-content mb-1.5"
        >
          {label}
        </label>
        <div className="relative">
          <input
            id={id}
            type={type}
            name={id}
            autoComplete={autoComplete}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[id]}
            placeholder={placeholder}
            className={`w-full px-4 py-2.5 ${rightElement ? "pr-11" : ""} rounded-xl border bg-base-100 text-base-content text-sm outline-none transition-colors focus:ring-2 focus:ring-green-500/30 ${
              hasError
                ? "border-red-400 focus:border-red-400"
                : "border-base-300 focus:border-green-500"
            }`}
          />
          {rightElement}
        </div>
        {hasError && (
          <p className="mt-1.5 text-xs text-red-500">{formik.errors[id]}</p>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-base-100 border border-base-300 rounded-2xl shadow-sm p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <img
              src="/src/assets/images/freshcart-logo.svg"
              alt="FreshCart"
              className="h-9 mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-base-content">
              Create an account
            </h1>
            <p className="text-sm text-base-content/60 mt-1">
              Join FreshCart and start shopping
            </p>
          </div>

          {/* API error */}
          {apiError && (
            <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-xl px-4 py-3 mb-6 text-sm">
              <i className="fa-solid fa-circle-exclamation shrink-0" />
              <span>{apiError}</span>
            </div>
          )}

          <form onSubmit={formik.handleSubmit} noValidate className="space-y-4">
            <Field
              id="name"
              label="Full name"
              placeholder="John Doe"
              autoComplete="name"
            />
            <Field
              id="email"
              label="Email address"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
            />
            <Field
              id="phone"
              label="Phone number"
              type="tel"
              placeholder="01XXXXXXXXX"
              autoComplete="tel"
            />

            {/* Password with toggle */}
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
                  autoComplete="new-password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  placeholder="••••••••"
                  className={`w-full px-4 py-2.5 pr-11 rounded-xl border bg-base-100 text-base-content text-sm outline-none transition-colors focus:ring-2 focus:ring-green-500/30 ${
                    formik.errors.password && formik.touched.password
                      ? "border-red-400"
                      : "border-base-300 focus:border-green-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content/70 transition-colors"
                  aria-label="Toggle password visibility"
                >
                  <i className={`fa-regular ${showPassword ? "fa-eye-slash" : "fa-eye"} text-sm`} />
                </button>
              </div>
              {formik.errors.password && formik.touched.password && (
                <p className="mt-1.5 text-xs text-red-500">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* Confirm password */}
            <div>
              <label
                htmlFor="rePassword"
                className="block text-sm font-medium text-base-content mb-1.5"
              >
                Confirm password
              </label>
              <div className="relative">
                <input
                  id="rePassword"
                  type={showRePassword ? "text" : "password"}
                  name="rePassword"
                  autoComplete="new-password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.rePassword}
                  placeholder="••••••••"
                  className={`w-full px-4 py-2.5 pr-11 rounded-xl border bg-base-100 text-base-content text-sm outline-none transition-colors focus:ring-2 focus:ring-green-500/30 ${
                    formik.errors.rePassword && formik.touched.rePassword
                      ? "border-red-400"
                      : "border-base-300 focus:border-green-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowRePassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content/70 transition-colors"
                  aria-label="Toggle confirm password visibility"
                >
                  <i className={`fa-regular ${showRePassword ? "fa-eye-slash" : "fa-eye"} text-sm`} />
                </button>
              </div>
              {formik.errors.rePassword && formik.touched.rePassword && (
                <p className="mt-1.5 text-xs text-red-500">
                  {formik.errors.rePassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Creating account…
                </>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-base-content/60 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-green-600 hover:text-green-700 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
