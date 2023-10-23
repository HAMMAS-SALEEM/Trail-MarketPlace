import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../../utils/getCookie";

const accessToken = getCookie('accessToken');

export const fetchUser = createAsyncThunk('user/fetch', async () => {
  const user = await fetch('https://api.graniteaccess.xyz/oidc/me', {
      headers: {
          Authorization: `Bearer ${accessToken}`
      },
      method: 'POST'
  })
  return user.json();
})

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    user: '',
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchUser.pending, (state) => {
        state.status = 'loading'
    })
    .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
    })
    .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
    })
  }
})

export default userSlice.reducer;