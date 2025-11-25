import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function RecentProducts() {
  let [recentProducts, setRecentProducts] = useState([]);
  let [page, setPage] = useState(1);
  let [totalPages, setTotalPages] = useState(0);

  function getRecentproducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=8`)
      .then((response) => {
        console.log(response.data.data);
        setRecentProducts(response.data.data);
        setTotalPages(response.data.metadata.numberOfPages);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getRecentproducts();
  }, [page]);

  return (
    <>
      <div className="container mx-auto px-6 py-10">
        <div
          className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          gap-6 
          justify-items-center
        "
        >
          {recentProducts.map((product) => (
            <div
              key={product.id}
              className="w-full max-w-sm bg-neutral-primary-soft p-6 border border-default rounded-base shadow-xs"
            >
              {/* img */}
              <Link to="/details">
                <img
                  className="rounded-base mb-6"
                  src={product.imageCover}
                  alt="product image"
                />
              

              <div>
                <div className="flex items-center mb-2">
                    <svg
                    className="w-5 h-5 text-yellow-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                  </svg>
                  <span className="bg-brand-softer  text-fg-brand-strong text-xs font-medium px-1.5 py-0.5 rounded-sm">
                    {product.ratingsAverage}
                  </span>
                  
                </div>

                
                  <h5 className="text-lg text-heading font-semibold tracking-tight">
                    {product.title.split(" ").slice(0, 3).join(" ")}
                  </h5>
                

                
              </div>
</Link>
              <div className="flex items-center justify-between mt-6">
                  <span className="text-2xl font-bold text-heading">
                    {product.price} EGP
                  </span>

                  <button
                    type="button"
                    className="inline-flex items-center text-white bg-green-700 hover:bg-green-800 box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none"
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
                </div>
            </div>
          ))}
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-400 dark:text-white rounded disabled:opacity-40"
          >
            Prev
          </button>

          <span className="font-bold text-lg">
            {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-400 rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
