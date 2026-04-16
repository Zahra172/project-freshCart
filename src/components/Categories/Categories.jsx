import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Categories() {
  const [categories, setCategories] = useState([]);
  function getCategories() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(()=>{
    getCategories();
  },[])
  return (
    <div className="my-14 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
  {categories.map((category) => (
    <div
      key={category.id}
      className="bg-white rounded-2xl shadow p-3 text-center hover:shadow-lg transition"
    >
      <img
        className="w-full h-32 object-cover rounded-xl mb-2"
        src={category.image}
        alt={category.name}
      />
      <h3 className="text-sm font-semibold">{category.name}</h3>
    </div>
  ))}
</div>
  )
}
