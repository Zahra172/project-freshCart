import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react'

const useProducts = () => {
    let [page, setPage] = useState(1);

  // Fetch recent products using React Query
  function getRecentproducts() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=8`,
    );
  }

  // Use useQuery to fetch recent products based on the current page
  let responseObj = useQuery({
    queryKey: ["recentProducts", page],
    queryFn: getRecentproducts,
   
  });

  // Log the data received from React Query
  console.log("resent products from tanstank", responseObj.data);

  // Update total pages when data changes
  let totalPages = responseObj?.data?.data.metadata.numberOfPages || 0;
  return {...responseObj,  totalPages, page, setPage}
}

export default useProducts
