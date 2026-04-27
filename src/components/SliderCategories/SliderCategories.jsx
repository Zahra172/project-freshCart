import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const SliderCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const settings = {
    autoplay: true,
    autoplaySpeed: 2500,
    infinite: true,
    speed: 400,
    slidesToShow: 7,
    slidesToScroll: 2,
    arrows: false,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 6 } },
      { breakpoint: 1024, settings: { slidesToShow: 5 } },
      { breakpoint: 768, settings: { slidesToShow: 4 } },
      { breakpoint: 640, settings: { slidesToShow: 3 } },
      { breakpoint: 400, settings: { slidesToShow: 2 } },
    ],
  };

  useEffect(() => {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((res) => {
        setCategories(res.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex gap-4 overflow-hidden mb-8 animate-pulse">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="shrink-0 flex flex-col items-center gap-2">
            <div className="h-16 w-16 rounded-full bg-base-300" />
            <div className="h-3 w-14 rounded bg-base-300" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-base-content mb-5">
        Shop by Category
      </h2>
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category._id} className="px-2">
            <Link
              to="/categories"
              className="flex flex-col items-center gap-2 group"
            >
              <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-base-300 group-hover:border-green-500 transition-colors shadow-sm">
                <img
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                />
              </div>
              <span className="text-xs font-medium text-base-content/80 text-center leading-tight line-clamp-2 max-w-[72px]">
                {category.name}
              </span>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderCategories;
