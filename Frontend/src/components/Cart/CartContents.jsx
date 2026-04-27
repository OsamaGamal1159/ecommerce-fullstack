import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../../Redux/Slices/cartSlice.js";

const CartContents = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  const handleAddTocart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        }),
      );
    }
  };
  console.log("Cart Products:", JSON.stringify(cart.products, null, 2));
  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(removeFromCart({ productId, guestId, userId, size, color }));
  };

  return (
    <div className="flex flex-col gap-4">
      {cart.products.map((product) => (
        <div
          key={`${product.productId}-${product.size}-${product.color}`}
          className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-3 shadow-sm"
        >
          {/* صورة المنتج */}
          <img
            src={product.image} // ✅ image مش images
            alt={product.name}
            className="w-20 h-24 object-cover rounded-lg flex-shrink-0"
          />

          {/* تفاصيل المنتج */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-800 text-sm truncate">
              {product.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                {product.size}
              </span>
              <span
                className="w-4 h-4 rounded-full border border-gray-300 inline-block"
                style={{ backgroundColor: product.color.toLowerCase() }}
              />
            </div>

            {/* أزرار الكمية */}
            <div className="flex items-center gap-3 mt-3">
              <button
                onClick={() =>
                  handleAddTocart(
                    product.productId,
                    -1,
                    product.quantity,
                    product.size,
                    product.color,
                  )
                }
                className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100 transition"
              >
                -
              </button>
              <span className="text-sm font-medium w-4 text-center">
                {product.quantity}
              </span>
              <button
                onClick={() =>
                  handleAddTocart(
                    product.productId,
                    +1,
                    product.quantity,
                    product.size,
                    product.color,
                  )
                }
                className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100 transition"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <p className="font-semibold text-gray-800 text-sm">
              ${product.price.toLocaleString()}
            </p>
            <button
              onClick={() =>
                handleRemoveFromCart(
                  product.productId,
                  product.size,
                  product.color,
                )
              }
              className="text-gray-400 hover:text-red-500 transition"
            >
              <RiDeleteBin3Line className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
