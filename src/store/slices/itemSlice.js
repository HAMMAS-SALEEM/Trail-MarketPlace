// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from 'axios';

// const initialState = {
//     data: [],
//     status: 'idle',
//     error: null,
// };

// const fetchData = createAsyncThunk('FETCH_ITEMS', async () => {
//     const res = await axios.get('http://localhost:1337/api/products');
//     console.log(res.data)
//     return res.data
// })

// export const ItemSlice = createSlice({
//     name: "ItemSlice",
//     initialState,
//     extraReducers: (builder) => {
//         builder
//         .addCase(fetchData.pending, (state) => {
//             state.status = 'loading'
//         })
//         .addCase(fetchData.fulfilled, (state) => {
//             state.status = 'succeeded'
//         })
//         .addCase(fetchData.error, (state) => {
//             state.error = 'failed'
//             state.error = action.error.message
//         })
//     }
// })

// export default ItemSlice.reducer;