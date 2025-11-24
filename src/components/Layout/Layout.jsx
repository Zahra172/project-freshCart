import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow min-h-[60vh] container mx-auto px-4">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
