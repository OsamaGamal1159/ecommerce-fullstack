import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getToken = () => `Bearer ${localStorage.getItem("userToken")}`;

export const fetchAdminProducts = createAsyncThunk(
  "adminProducts/fetchAdminProducts",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/products`,
      {
        headers: { Authorization: getToken() },
      },
    );
    return response.data;
  },
);

export const createProduct = createAsyncThunk(
  "adminProducts/createProduct",
  async (productData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/products`,
      productData,
      {
        headers: { Authorization: getToken() },
      },
    );
    return response.data;
  },
);

export const updateProduct = createAsyncThunk(
  "adminProducts/updateProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      console.log("🔄 Updating product:", id);
      console.log("📤 Product data:", JSON.stringify(productData, null, 2));

      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/products/${id}`,
        productData,
        {
          headers: { Authorization: getToken() },
        },
      );

      console.log(
        "✅ Update response:",
        JSON.stringify(response.data, null, 2),
      );
      return response.data;
    } catch (error) {
      console.error("❌ Update error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const deleteProduct = createAsyncThunk(
  "adminProducts/deleteProduct",
  async (id) => {
    await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/products/${id}`,
      {
        headers: { Authorization: getToken() },
      },
    );
    return id;
  },
);

const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload._id) {
          const index = state.products.findIndex(
            (product) => product._id === action.payload._id,
          );
          if (index !== -1) {
            state.products[index] = action.payload;
          }
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.error("Update product error:", action.error);
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product._id !== action.payload,
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default adminProductSlice.reducer;
