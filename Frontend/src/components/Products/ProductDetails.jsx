import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid.jsx";
import { products } from "./../../../../Backend/src/data/products";
const selectedProduct = {
  name: "Stylish Jacket",
  price: 120,
  originalPrice: 150,
  description: "This is a stylish jacket for any occasion",
  brand: "FashionBrand",
  material: "Leather",
  sizes: ["S", "M", "L", "XL"],
  colors: ["Red", "Black"],

  images: [
    {
      url: "https://picsum.photos/500/500?random=1",
      altText: "Stylish Jacket 1",
    },
    {
      url: "https://picsum.photos/500/500?random=2",
      altText: "Stylish Jacket 2",
    },
  ],
};

const similarProducts = [
  {
    _id: "1",
    name: "Casual Shirt",
    price: 80,
    images: [{ url: "https://picsum.photos/500/500?random=3" }],
  },
  {
    _id: "2",
    name: "Denim Jeans",
    price: 120,
    images: [{ url: "https://picsum.photos/500/500?random=4" }],
  },
  {
    _id: "3",
    name: "Denim Jeans",
    price: 120,
    images: [{ url: "https://picsum.photos/500/500?random=5" }],
  },
  {
    _id: "4",
    name: "Denim Jeans",
    price: 120,
    images: [{ url: "https://picsum.photos/500/500?random=6" }],
  },
];

const ProductDetails = () => {
  const [mainImage, setMainImage] = useState(
    selectedProduct.images[0]?.url || "",
  );
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);
  const handelQuantityChange = (action) => {
    return () => {
      if (action === "plus") {
        setQuantity((prev) => prev + 1);
      } else if (action === "minus" && quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    };
  };
  const handelAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please Select color and size before adding to cart", {
        duration: 1000,
      });
      return;
    }

    setIsButtonDisabled(true);
    setTimeout(() => {
      setIsButtonDisabled(false);
      toast.success("Product added successfully!", {
        duration: 1000,
      });
      setIsButtonDisabled(false);
    }, 500);
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          {/* Left Thumbails  */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={img.altText}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border
                 ${mainImage === img.url ? "border-black" : "border-gray-300"}`}
                onClick={() => setMainImage(img.url)}
              />
            ))}
          </div>
          {/* Main Image  */}
          <div className="mb-w-1/2 ">
            <div className="mb-4">
              {mainImage && (
                <img
                  src={mainImage}
                  alt="Main Product"
                  className="w-full h-auto object-cover rounded-lg"
                />
              )}
            </div>
          </div>
          {/* Mobile Thumbnails */}
          <div className="md:hidden flex overscroll-x-scroll space-x-4 mb-4">
            {selectedProduct.images.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={img.altText}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border
                 ${mainImage === img.url ? "border-black" : "border-gray-300"}`}
                onClick={() => setMainImage(img.url)}
              />
            ))}
          </div>

          {/* Right Side  */}
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-2xl font-semibold mb-2 md:text-3xl">
              {selectedProduct.name}
            </h1>
            <p className="text-lg text-gray-600 mb-1 line-through">
              $
              {selectedProduct.originalPrice &&
                `${selectedProduct.originalPrice}`}
            </p>
            <p className="text-xl mb-2 text-gray-500">
              ${selectedProduct.price}
            </p>
            <p className="text-gray-600 mt-4">{selectedProduct.description}</p>

            <div className="mt-4">
              <p className="text-gray-700">Color:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border ${
                      selectedColor === color
                        ? "border-4 border-black"
                        : "border-gray-300"
                    }`}
                    style={{
                      backgroundColor: color.toLocaleLowerCase(),
                      filter: "brightness(0.5)",
                    }}
                  ></button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-500">Size:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded border ${selectedSize === size ? "bg-black text-white" : ""}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6 ">
              <p className="text-gray-700 ">Quantity:</p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  onClick={handelQuantityChange("minus")}
                  className="px-2 py-1 bg-gray-200 rounded text-lg "
                >
                  -
                </button>
                <span className="text-lg">{quantity}</span>
                <button
                  onClick={handelQuantityChange("plus")}
                  className="px-2 py-1 bg-gray-200 rounded text-lg "
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={handelAddToCart}
              disabled={isButtonDisabled}
              className={`bg-black text-white py-2 px-2 rounded w-full mb-4 ${
                isButtonDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-700"
              }`}
            >
              {isButtonDisabled ? "Adding..." : "ADD TO CART"}
            </button>
            <div className="mt-10 text-gray-700">
              <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
              <table className="w-full text-left text-sm text-gray-500">
                <tbody>
                  <tr>
                    <td className="py-1">Brand</td>
                    <td className="py-1">{selectedProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Material</td>
                    <td className="py-1">{selectedProduct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <h2 className="text-2xl text-center font-medium mb-4">
            Yoy May Also Like
          </h2>
          <ProductGrid product={similarProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
