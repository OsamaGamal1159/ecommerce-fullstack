import React from "react";
import heroImg from "../../assets/rabbit-hero2.webp";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative">
      <img
        src={heroImg}
        alt="Rabbit"
        className="w-full h-[400px] md:h-[750px] object-cover"
      />
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center ">
        <div className="text-center text-white p-6 mt-4">
          <h1 className=" text-4xl md:text-7xl font-semibold tracking-tighter uppercase mb-4">
            {" "}
            Vacation <br /> Ready
          </h1>
          <p className="text-sm tracking-tighter md:text-lg mb-6">
            Explore our vacation-ready outfits with fast worldwide shipping
          </p>
          <Link
            to="/collections/all"
            className="
    inline-flex items-center justify-center
    px-6 py-2
    rounded-full
    font-semibold
    bg-[#ea2e0e]
    text-white
    border border-indigo-100
    shadow-sm
    hover:shadow-md
    hover:bg-[#ea2e0e]
    hover:scale-[1.03]
    active:scale-95
    transition-all duration-200 ease-in-out
  "
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
