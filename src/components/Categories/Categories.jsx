import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((res) => setCategories(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-10">
        <div className="h-8 w-40 rounded bg-base-300 animate-pulse mb-8" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-base-200 rounded-2xl overflow-hidden"
            >
              <div className="h-36 bg-base-300" />
              <div className="p-3">
                <div className="h-4 w-3/4 mx-auto rounded bg-base-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-10">
      <h1 className="text-2xl font-bold text-base-content mb-8">
        All Categories
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {categories.map((category) => (
          <div
            key={category._id}
            className="group bg-base-100 border border-base-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <div className="overflow-hidden bg-base-200">
              <img
                className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                src={category.image}
                alt={category.name}
                loading="lazy"
              />
            </div>
            <div className="p-3 text-center">
              <h3 className="text-sm font-semibold text-base-content group-hover:text-green-600 transition-colors">
                {category.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
