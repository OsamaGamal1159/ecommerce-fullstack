import React from "react";
import Hero from "./../components/Layout/Hero";
import GenderCollection from "../components/Products/GenderCollection.jsx";
import NewArrivals from './../components/Products/NewArrivals';
import ProductDetails from "../components/Products/ProductDetails.jsx";

const Home = () => {
  return (
    <div>
      <Hero />
      <GenderCollection />
      <NewArrivals />
      {/* Best Sellers */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Sellers</h2>
      <ProductDetails />
    </div>
  );
};

export default Home;
