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
    <div>
      {categories.map((category) => (
        <div key={category.id}>
          <h3>{category.name}</h3>
          <img src={category.image} alt={category.name} />
        </div>
      ))}

    </div>
  )
}
