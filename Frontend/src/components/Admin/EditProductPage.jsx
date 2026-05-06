/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductDetails } from "../../../Redux/Slices/productsSlice.js";
import axios from "axios";
import { updateProduct } from "../../../Redux/Slices/adminProductSlice.js";

const EditProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    selectedProduct,
    loading: fetchLoading,
    error: fetchError,
  } = useSelector((state) => state.products);

  // Get admin product state for update operations
  const { loading: updateLoading, error: updateError } = useSelector(
    (state) => state.adminProducts,
  );

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [],
  });

  const [uploadin, setUploadin] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct) {
      setProductData(selectedProduct);
    }
  }, [selectedProduct]);

  // Navigate when update completes successfully
  useEffect(() => {
    if (updateSuccess) {
      alert("Product updated successfully!");
      navigate("/admin/products");
    }
  }, [updateSuccess, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      setUploadin(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      setProductData((prevData) => ({
        ...prevData,
        images: [...prevData.images, { url: data.imageUrl, altText: "" }],
      }));
      setUploadin(false);
    } catch (error) {
      console.error(error);
      setUploadin(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productData.images.length === 0) {
      alert("Please upload at least one image!");
      return;
    }

    console.log("🔄 Submitting product update:", productData);
    dispatch(updateProduct({ id, productData }))
      .then((result) => {
        if (result.payload) {
          console.log("✅ Update successful");
          setUpdateSuccess(true);
        } else if (result.error) {
          console.error("❌ Update failed:", result.error);
          alert(
            "Failed to update product: " +
              (result.error?.message || "Unknown error"),
          );
        }
      })
      .catch((error) => {
        console.error("❌ Update error:", error);
        alert("Error updating product: " + error.message);
      });
  };

  if (fetchLoading) return <p>Loading product...</p>;
  if (fetchError) return <p>Error loading product: {fetchError}</p>;
  if (updateError) return <p>Error updating product: {updateError}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        {/* Description */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={productData.description}
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={handleChange}
            rows={4}
            required
          />
        </div>
        {/* Price */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        {/* Count In Stock */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Count in Stock</label>
          <input
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        {/* SKU */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">SKU</label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        {/* Sizes */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Sizes (comma-separated)
          </label>
          <input
            type="text"
            name="sizes"
            value={productData.sizes.join(", ")}
            onChange={(e) =>
              setProductData({
                ...productData,
                sizes: e.target.value.split(",").map((size) => size.trim()),
              })
            }
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        {/* Colors */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Colors (comma-separated)
          </label>
          <input
            type="text"
            name="colors"
            value={productData.colors.join(", ")}
            onChange={(e) =>
              setProductData({
                ...productData,
                colors: e.target.value.split(",").map((color) => color.trim()),
              })
            }
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        {/* Image Upload */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Upload Image</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md p-2
             file:mr-4 file:py-2 file:px-4
             file:rounded-md file:border-0
             file:text-sm file:font-semibold
             file:bg-gray-500 file:text-white"
          />
          {uploadin && <p>Uploading Image....</p>}
          <div className="flex gap-4 mt-4">
            {productData.images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image.url}
                  alt={image.altText || "Product Image"}
                  className="w-20 h-20 object-cover rounded-md shadow-md"
                />
                <button
                  type="button"
                  onClick={() =>
                    setProductData((prevData) => ({
                      ...prevData,
                      images: prevData.images.filter((_, i) => i !== index),
                    }))
                  }
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                >
                  X
                </button>
              </div>
            ))}
          </div>
          {productData.images.length === 0 && (
            <p className="text-red-500 text-sm mt-2">
              Please upload at least one image!
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={updateLoading}
          className={`w-full py-2 rounded-md transition-colors ${
            updateLoading
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          {updateLoading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
