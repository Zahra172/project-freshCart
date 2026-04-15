import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

const SliderCategories = () => {
  const [categories, setCategories] = useState([]);
   var settings = {
    autoplay: true,
    infinite: true,
    speed: 400,
    slidesToShow: 8,
    slidesToScroll: 3,
  };
  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getCategories();
  }, []);
  return <Slider {...settings}>
    {categories.map((category) => (
      <div key={category.id}>
        <img className="slider-img w-full" src={category.image} alt={category.name} />
        <h3>{category.name}</h3>
      </div>
    ))}
  </Slider>;
};

export default SliderCategories;
