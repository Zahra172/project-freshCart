// في AllOrders.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AllOrders() {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate("/");
  }, []);

  return null;
}