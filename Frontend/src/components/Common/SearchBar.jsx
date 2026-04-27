import React from "react";
import { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchProductsByFilters,
  setFilters,
} from "../../../Redux/Slices/productsSlice.js";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const HandleSearchToggle = () => {
    setIsOpen(!isOpen);
  };
  const handelSearch = (e) => {
    e.preventDefault();
    dispatch(setFilters({ search: searchTerm }));
    dispatch(fetchProductsByFilters({ search: searchTerm }));
    navigate(`/collections/all?search=${searchTerm}`)
    setIsOpen(false);
  };
  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-300
       ${isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"}`}
    >
      {isOpen ? (
        <form
          onSubmit={handelSearch}
          className=" relative flex items-center justify-center w-full"
        >
          <div className="relative w-1/2 ">
            <input
              type="text"
              placeholder="Searsh"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none focus:ring-2
               focus:ring-blue-500 w-full placeholder:text-gray-700 "
            ></input>
            <button
              type="submit"
              className="absolute right-1 top-5 transform -translate-y-1/2 text-gray-600 hover:trxt-gray-800"
            >
              <HiMagnifyingGlass className="h-6 w-6 " />
            </button>
          </div>
          <button
            type="button"
            onClick={HandleSearchToggle}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600
           hover:text-gray-800"
          >
            <HiMiniXMark className="h-6 w-6 cursor-pointer" />
          </button>
        </form>
      ) : (
        <button onClick={HandleSearchToggle}>
          <HiMagnifyingGlass className="h-6 w-6 cursor-pointer" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
