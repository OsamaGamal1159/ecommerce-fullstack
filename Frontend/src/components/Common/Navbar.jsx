import React from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";

const Navbar = () => {
  return (
    <>
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div>
          <Link to="/" className="text-2xl font-medium">
            Rabbit
          </Link>
        </div>
        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Men
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Women
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Top Wear
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Bottom Wear
          </Link>
        </div>
        {/* Icons */}
        <div className=" flex space-x-4 items-center ">
          <Link to="/profile" className="hover:text-black-">
            <HiOutlineUser className="h-6 w-6 text-gray-700"></HiOutlineUser>
          </Link>
          <button className="relative hover:text-black cursor-pointer">
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700"></HiOutlineShoppingBag>
            <span className="absolute bg-[#ea2e0e] text-white text-xs rounded-full px-2 py-0.5">
              4
            </span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
