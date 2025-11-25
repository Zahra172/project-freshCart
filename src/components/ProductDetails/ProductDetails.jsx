import axios from "axios";
import React, {  useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ProductDetails() {
  let { id, category } = useParams();
  let [prodDetails, setProdDetails] = useState(null);
  let [relatedProd, setRelatedProd] = useState([]);
  let [liked, setLiked] = useState(false);

  function getProductDetails(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((response) => {
        console.log(response.data.data);
        setProdDetails(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function getRelatedProduct(category) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((response) => {
        let allProducts = response.data.data;
        let related = allProducts.filter(
          (product) => product.category.name == category
        );
        setRelatedProd(related);
        console.log(related);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getProductDetails(id);
    getRelatedProduct(category);
  },[id, category]);

  return (
    <>
      
      <div className="container mx-auto px-6 py-10">
        <div
          className="grid 
          grid-cols-1 
          sm:grid-cols-1 
          md:grid-cols-2 
          lg:grid-cols-2 
          gap-6 
          justify-items-center "
        >
          <div className="w-1/2 ">
            {/* <Slider {...settings}>
                {prodDetails?.images.map((src) => (
                  <img
                    className="w-full rounded-lg"
                    key={prodDetails.id}
                    src={src}
                    alt={prodDetails?.title}
                  />
                ))}
              </Slider> */}
            <img
              className="rounded-base mb-6"
              src={prodDetails?.imageCover}
              alt={prodDetails?.title}
            />
          </div>
          <div className=" px-5 py-6">
            <h1 className=" text-green-700 font-bold ">{prodDetails?.title}</h1>
            <p className="my-6">{prodDetails?.description}</p>
            <div className="">
              <span className="font-semibold block my-4">
                Price : <span>{prodDetails?.price} EGP</span>
              </span>
              <span className="font-semibold">Rating : </span>{" "}
              <span>
                {prodDetails?.ratingsAverage}{" "}
                <i className="fa-solid fa-star pb-6 text-yellow-500"></i>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="inline-flex items-center  text-white bg-green-700 hover:bg-green-800 box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none"
              >
                <svg
                  className="w-4 h-4 me-1.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                  />
                </svg>
                Add to cart
              </button>

              {/* <svg
                  onClick={() => {
                    toggleWishlist(prodDetails.id);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={isLiked ? "red" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className={`w-12 h-12 cursor-pointer ${
                    isLiked ? "text-red-500" : "text-gray-500"
                  } transform rotate-180 overflow-visible`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11.049 2.927C10.259 1.765 8.9 1.765 8.11 2.927 6.759 4.472 3 8.29 3 11.7c0 3.412 2.588 5.79 5.539 5.79 1.65 0 3.083-.852 4.461-2.317 1.378 1.465 2.811 2.317 4.461 2.317 2.951 0 5.539-2.378 5.539-5.79 0-3.41-3.759-7.228-5.11-8.773z"
                  />
                </svg> */}
            </div>
          </div>
        </div>
        {/* ////////////////////////////////////////////// */}
        <h5>You May Also Like</h5>
        <div className=" grid py-4 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-6 
          gap-6 
          justify-items-center">
          {relatedProd.map((product) => (
            <div
              key={product.id}
              className="w-full max-w-sm bg-neutral-primary-soft p-6 border border-default rounded-base shadow-xs"
            >
              {/* img */}
              <Link to={`/details/${product.id}/${product.category.name}`}>
                <img
                  className="rounded-base mb-2"
                  src={product.imageCover}
                  alt="product image"
                />
              </Link>
              <div className="flex items-center justify-between mt-6">
                <h5 className="text-base text-heading font-semibold tracking-tight">
                    {product.title.split(" ").slice(0, 3).join(" ")}
                  </h5>
                <span className="text-base font-bold text-heading">
                  {product.price} EGP
                </span>
                 
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
