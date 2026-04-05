import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";

const CartContents = () => {
  const CartProducts = [
    {
      productId: 1,
      name: "T-shirt",
      size: "M",
      color: "Red",
      quntity: 1,
      Image: "https://picsum.photos/200?random=1",
      price: 49.99,
    },
    {
      productId: 2,
      name: "Jeans",
      size: "32",
      color: "Blue",
      quntity: 1,
      Image: "https://picsum.photos/200?random=2",
      price: 49.99,
    },
  ];
  return (
    <div>
      {CartProducts.map((product) => (
        <div
          key={product.productId}
          className="flex items-center space-x-4 mb-4"
        >
          <img
            src={product.Image}
            alt={product.name}
            className="w-20 h-24 object-cover mr-4 rounded"
          />
          <div>
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-500">
              Size: {product.size}, Color: {product.color}
            </p>
            <div className="flex items-center mt-2">
              <button className="border rounded px-2  py-1 text-xl font-medium">
                -
              </button>
              <span className="mx-4">{product.quntity}</span>
              <button className="border rounded px-2 py-1 text-xl font-medium mx-2">
                +
              </button>
            </div>
          </div>
          <div className="ml-auto">
            <p>$ {product.price.toLocaleString()}</p>
            <button className="text-sm hover:text-red-700 ">
              <RiDeleteBin3Line className="h-5 w-5  text-red-500 mt-2" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
