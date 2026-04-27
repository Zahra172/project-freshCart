import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/brands")
      .then((res) => setBrands(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-10">
        <div className="h-8 w-32 rounded bg-base-300 animate-pulse mb-8" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-base-200 rounded-2xl h-28 flex items-center justify-center"
            >
              <div className="h-12 w-24 rounded bg-base-300" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-10">
      <h1 className="text-2xl font-bold text-base-content mb-8">
        All Brands
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {brands.map((brand) => (
          <div
            key={brand._id}
            className="group bg-base-100 border border-base-300 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 shadow-sm hover:shadow-md hover:border-green-400 transition-all duration-300 cursor-pointer min-h-[7rem]"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="h-12 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />
            <span className="text-xs font-semibold text-base-content/70 text-center group-hover:text-green-600 transition-colors">
              {brand.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
