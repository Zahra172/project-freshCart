import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishlistContext } from "../../Context/WishlistContext";

export default function ProductDetails() {
  let { id, category } = useParams();
  let [prodDetails, setProdDetails] = useState(null);
  let [relatedProd, setRelatedProd] = useState([]);
  // let [liked, setLiked] = useState(false);
  let { addToCart } = useContext(CartContext);
  let {addToWishlist ,removeFromWishlist ,wishlist} =useContext(WishlistContext);
  let liked = wishlist.some((item) => item._id === id || item.id === id);
async function toggleWishlist(productId) {
  try {
    if (liked) {
      const response = await removeFromWishlist(productId);
      if (response.data.status === "success") {
        toast.success("Removed from wishlist");
      }
    } else {
      const response = await addToWishlist(productId);
      if (response.data.status === "success") {
        toast.success("Added to wishlist");
      }
    }
  } catch (error) {
    toast.error("Something went wrong");
  }
}
  function addProductToCart(productId) {
    addToCart(productId)
      .then((response) => {
        if (response.data.status === "success") {
          console.log(response);
          toast.success("Product added to cart successfully!");
        }
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message || "Failed to add product to cart.",
        );
      });
  }
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
          (product) => product.category.name == category,
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
  }, [id, category]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };
  const settings2 = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
          <div className="w-1/2">
            <Slider {...settings2}>
              {prodDetails?.images?.map((src, index) => (
                <div key={index}>
                  <img
                    className="w-full rounded-lg"
                    src={src}
                    alt={prodDetails?.title}
                  />
                </div>
              ))}
            </Slider>
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
                onClick={() => addProductToCart(prodDetails.id)}
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
              <button onClick={() => toggleWishlist(prodDetails.id)} >
                <i
                  className={`fa-heart text-xl cursor-pointer transition ${
                    liked ? "fa-solid text-red-500" : "fa-regular text-gray-400"
                  }`}
                ></i>
              </button>
            </div>
          </div>
        </div>
        {/* ////////////////////////////////////////////// */}
        <h5>You May Also Like</h5>
        <Slider {...settings}>
          {relatedProd.map((product) => (
            <div key={product.id} className="p-2 my-4">
              <div className="bg-neutral-primary-soft p-4 border rounded shadow h-full">
                <Link to={`/details/${product.id}/${product.category.name}`}>
                  <img
                    className="rounded mb-2 w-full"
                    src={product.imageCover}
                    alt={product.title}
                  />
                </Link>

                <div className="flex justify-between mt-4">
                  <h5 className="text-sm font-semibold">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h5>

                  <span className="font-bold">{product.price} EGP</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
