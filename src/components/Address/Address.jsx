import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import toast from "react-hot-toast";

const Address = () => {
  const { cartId } = useParams();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  async function checkout(addressData) {
    setLoading(true);
    setApiError("");
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        { shippingAddress: addressData },
        {
          params: { url: window.location.origin },
          headers: { token: localStorage.getItem("userToken") },
        },
      );
      if (data.session?.url) {
        window.location.href = data.session.url;
      }
    } catch (error) {
      const msg = error?.response?.data?.message || "Something went wrong";
      setApiError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  const validationSchema = Yup.object().shape({
    details: Yup.string()
      .min(3, "At least 3 characters")
      .max(100, "At most 100 characters")
      .required("Address details are required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number")
      .required("Phone is required"),
    city: Yup.string()
      .min(3, "At least 3 characters")
      .max(15, "At most 15 characters")
      .required("City is required"),
  });

  const formik = useFormik({
    initialValues: { details: "", phone: "", city: "" },
    validationSchema,
    onSubmit: checkout,
  });

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="bg-base-100 border border-base-300 rounded-2xl shadow-sm p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-base-content">
              Shipping Address
            </h1>
            <p className="text-sm text-base-content/60 mt-1">
              Enter your delivery details to complete the order
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
            {/* Address details */}
            <div>
              <label
                htmlFor="details"
                className="block text-sm font-medium text-base-content mb-1.5"
              >
                Address details
              </label>
              <textarea
                id="details"
                name="details"
                rows={3}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.details}
                placeholder="Street, building, apartment…"
                className={`w-full px-4 py-2.5 rounded-xl border bg-base-100 text-base-content text-sm outline-none transition-colors focus:ring-2 focus:ring-green-500/30 resize-none ${
                  formik.errors.details && formik.touched.details
                    ? "border-red-400"
                    : "border-base-300 focus:border-green-500"
                }`}
              />
              {formik.errors.details && formik.touched.details && (
                <p className="mt-1.5 text-xs text-red-500">
                  {formik.errors.details}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-base-content mb-1.5"
              >
                Phone number
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                autoComplete="tel"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                placeholder="01XXXXXXXXX"
                className={`w-full px-4 py-2.5 rounded-xl border bg-base-100 text-base-content text-sm outline-none transition-colors focus:ring-2 focus:ring-green-500/30 ${
                  formik.errors.phone && formik.touched.phone
                    ? "border-red-400"
                    : "border-base-300 focus:border-green-500"
                }`}
              />
              {formik.errors.phone && formik.touched.phone && (
                <p className="mt-1.5 text-xs text-red-500">
                  {formik.errors.phone}
                </p>
              )}
            </div>

            {/* City */}
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-base-content mb-1.5"
              >
                City
              </label>
              <input
                id="city"
                type="text"
                name="city"
                autoComplete="address-level2"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                placeholder="Cairo"
                className={`w-full px-4 py-2.5 rounded-xl border bg-base-100 text-base-content text-sm outline-none transition-colors focus:ring-2 focus:ring-green-500/30 ${
                  formik.errors.city && formik.touched.city
                    ? "border-red-400"
                    : "border-base-300 focus:border-green-500"
                }`}
              />
              {formik.errors.city && formik.touched.city && (
                <p className="mt-1.5 text-xs text-red-500">
                  {formik.errors.city}
                </p>
              )}
            </div>

            {/* Secure checkout note */}
            <div className="flex items-center gap-2 text-xs text-base-content/50 bg-base-200 rounded-xl px-4 py-3">
              <i className="fa-solid fa-lock text-green-600" />
              <span>
                Your payment is secured by Stripe. You'll be redirected to
                complete payment.
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Processing…
                </>
              ) : (
                <>
                  <i className="fa-solid fa-credit-card" />
                  Proceed to Payment
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Address;
