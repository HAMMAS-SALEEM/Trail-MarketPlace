import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { BASE_URL } from "../../config/app.config";

const initialState = {
    products: {data: [], meta: {pagination: {total: 0}}},
    status: 'idle',
    error: null,
};

export const fetchProducts = createAsyncThunk('FETCH_PRODUCTS', async (start) => {
  const res = await axios.get(`${BASE_URL}/api/products?pagination[start]=${start}&pagination[limit]=10&sort[1]=createdAt:desc`);
  return res.data
})

export const ProductsSlice = createSlice({
  name: "ProductsSlice",
  initialState,
  reducers: {
    clearState() {
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
    })
    .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = {...action.payload, data: [...state.products.data, ...action.payload.data]}
    })
    .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
    })
  }
})

export const { clearState } = ProductsSlice.actions;
export default ProductsSlice.reducer;
