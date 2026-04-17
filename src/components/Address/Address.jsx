import { useParams } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

const Address = () => {
  let { cartId } = useParams();
  let [apiError, setApiError] = useState(""); // state to hold API error messages
  let [loading, setLoading] = useState(false); // state to indicate loading status
  let navigate = useNavigate(); // hook to navigate to another page

  async function checkout(addressData) {
    try {
      setLoading(true);

      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        {
          shippingAddress: addressData,
        },
        {
          params: { url: "http://localhost:5173" },
          headers: { token: localStorage.getItem("userToken") },
        },
      );

      if (data.session?.url) {
        window.location.href = data.session.url;
      }
    } catch (error) {
      setApiError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  let validationSchema = Yup.object().shape({
    details: Yup.string()
      .min(3, "Details min 3 chars")
      .max(100, "Details max 100 chars")
      .required("Details is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number")
      .required("Phone is required"),
    city: Yup.string()
      .min(3, "City min 3 chars")
      .max(15, "City max 15 chars")
      .required("City is required"),
  });

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema: validationSchema,
    onSubmit: checkout,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="  flex justify-center  my-10">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full md:w-1/3  border p-4">
            <legend className="fieldset-legend">Address</legend>
            <label className="label">Details</label>
            <input
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.details}
              name="details"
              className="input w-full px-2"
              placeholder="Details"
            />

            {formik.errors.details && formik.touched.details && (
              <div className="alert alert-error alert-soft text-sm py-2 mt-1 px-2">
                <span>{formik.errors.details}</span>
              </div>
            )}

            <label className="label">Phone</label>
            <input
              type="tel"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="phone"
              value={formik.values.phone}
              className="input w-full px-2"
              placeholder="Phone"
            />

            {formik.errors.phone && formik.touched.phone && (
              <div className="alert alert-error alert-soft text-sm py-2 mt-1 px-2">
                <span>{formik.errors.phone}</span>
              </div>
            )}

            <label className="label">City</label>
            <input
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
              name="city"
              className="input w-full px-2"
              placeholder="City"
            />

            {formik.errors.city && formik.touched.city && (
              <div className="alert alert-error alert-soft text-sm py-2 mt-1 px-2">
                <span>{formik.errors.city}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className=" btn bg-green-600 text-white border-t-green-900 mt-4
    disabled:bg-gray-400 disabled:text-gray-200 disabled:border-gray-400 disabled:cursor-not-allowed
              "
            >
              {loading ? "loading..." : "Checkout"}
            </button>

            {/* for errors from api */}
            {apiError ? (
              <div className="alert alert-error alert-soft text-sm py-2 mt-1 px-2">
                <span>{apiError}</span>
              </div>
            ) : (
              ""
            )}
          </fieldset>
        </div>
      </form>
    </>
  );
};

export default Address;
