import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { BASE_URL } from "../../config/app.config";

const initialState = {
    products: [],
    status: 'idle',
    error: null,
};

export const fetchProducts = createAsyncThunk('FETCH_PRODUCTS', async () => {
  const res = await axios.get(`${BASE_URL}/api/products`);
  return res.data
})

export const ProductsSlice = createSlice({
  name: "ProductsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
    })
    .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
    })
    .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
    })
  }
})

export default ProductsSlice.reducer;
