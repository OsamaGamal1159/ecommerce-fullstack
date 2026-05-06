import React from "react";
import { Link } from "react-router-dom";

const ProductGrid = ({ products, loading, error }) => {
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error {error}</p>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products && products.length > 0 ? (
        products.map((product, index) => {
          const imageUrl =
            product.images?.[0]?.thumbnail ||
            product.images?.[0]?.url ||
            "/placeholder.jpg";
          const altText = product.images?.[0]?.altText || product.name;

          return (
            <Link key={index} to={`/product/${product._id}`}>
              <div className="bg-white p-4 rounded-lg ">
                <div className="w-full h-96 mb-4 bg-gray-100 flex items-center justify-center">
                  <img
                    src={imageUrl}
                    alt={altText}
                    className="w-full h-full object-cover rounded-lg"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = "/placeholder.jpg";
                    }}
                  />
                </div>
                <h3 className="text-sm mb-2 ml-1.5"> {product.name}</h3>
                <p className="text-gray-500 font-medium text-sm tracking-tighter ml-1.5 ">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </Link>
          );
        })
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No products found
        </p>
      )}
    </div>
  );
};

export default ProductGrid;
