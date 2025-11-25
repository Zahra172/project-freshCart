import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
export default function Register() {
  let [apiError, setApiError] = useState(""); // state to hold API error messages
  let [loading, setLoading] = useState(false); // state to indicate loading status
  let navigate = useNavigate(); // hook to navigate to another page

  function handleRegister(formValues) {
    //function to handle register
    setLoading(true); // set loading to true when request starts
    //formValues = data i want to send el body bta3 el request
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", formValues)
      .then((res) => {
        setLoading(false); // set loading to false when request ends
        if (res.data?.message === "success") {
          localStorage.setItem("userToken" , res.data.token);
          navigate("/login");
        }
      })
      .catch((err) => {
        setLoading(false); // set loading to false when request ends
        setApiError(err?.response?.data?.message);
        console.log(err?.response?.data?.message);
      });
  }
  ///////////////////////////////////////////////////////////
  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name min 3 chars")
      .max(15, "Name max 15 chars")
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
        "Password must start with uppercase letter and be 6-10 chars"
      )
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("RePassword is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleRegister,
  });
  // useEffect(() => {
  //   console.log(formik.values)
  // }, [formik.values])
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="  flex justify-center  my-10">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full md:w-1/3  border p-4">
            <legend className="fieldset-legend">Register</legend>
            <label className="label">Name</label>
            <input
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              name="name"
              className="input w-full px-2"
              placeholder="Name"
            />

            {formik.errors.name && formik.touched.name && (
              <div className="alert alert-error alert-soft text-sm py-2 mt-1 px-2">
                <span>{formik.errors.name}</span>
              </div>
            )}

            <label className="label">Email</label>
            <input
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="email"
              value={formik.values.email}
              className="input w-full px-2"
              placeholder="Email"
            />
            {formik.errors.email && formik.touched.email && (
              <div className="alert alert-error alert-soft text-sm py-2 mt-1 px-2">
                <span>{formik.errors.email}</span>
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

            <label className="label">Password</label>
            <input
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="password"
              value={formik.values.password}
              className="input w-full px-2"
              placeholder="Password"
            />
            {formik.errors.password && formik.touched.password && (
              <div className="alert alert-error alert-soft text-sm py-2 mt-1 px-2">
                <span>{formik.errors.password}</span>
              </div>
            )}

            <label className="label">RePassword</label>
            <input
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="rePassword"
              value={formik.values.rePassword}
              className="input w-full px-2"
              placeholder="RePassword"
            />
            {formik.errors.rePassword && formik.touched.rePassword && (
              <div className="alert alert-error alert-soft text-sm py-2 mt-1 px-2">
                <span>{formik.errors.rePassword}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className=" btn bg-green-600 text-white border-t-green-900 mt-4
    disabled:bg-gray-400 disabled:text-gray-200 disabled:border-gray-400 disabled:cursor-not-allowed
              "
            >
              {loading ? "loading..." : "Register"}
            </button>

            {/* for errors from api */}
            {apiError ? (
              <div className="alert alert-error alert-soft text-sm py-2 mt-1 px-2">
                <span>{apiError}</span>
              </div>
            ) : (
              ""
            )}
        <p className="text-center py-3">Already have an account <span><Link className="underline  font-bold text-green-900" to="/login">Login</Link></span></p>
          </fieldset>
        </div>
      </form>

    </>
  );
}
