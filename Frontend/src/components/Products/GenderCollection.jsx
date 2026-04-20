import React from "react";
import mensCollectioniImage from "../../assets/mens-collection1.webp";
import womensCollectioniImage from "../../assets/womens-collection1.webp";
import { Link } from "react-router-dom";
const GenderCollection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* womens collection */}
        <div className="relative flex-1">
          <img
            src={womensCollectioniImage}
            alt="Women's Collection"
            className="w-full h-175 object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white/90 p-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Women's Collection{" "}
            </h2>
            <Link
              to="/collections/all?gender=women"
              className="text-blue-900 underline"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Men's Collection  */}
        <div className="relative flex-1">
          <img
            src={mensCollectioniImage}
            alt="Men's Collection"
            className="w-full h-175 object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white/90 p-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Men's Collection{" "}
            </h2>
            <Link
              to="/collections/all?gender=men"
              className="text-blue-900 underline"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollection;
