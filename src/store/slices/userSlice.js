import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const accessToken = 'CAPEyrWZ_8UcSknaSwc2P3Ed-UeFpspvUI_GacJh1xy'

export const fetchUser = createAsyncThunk('user/fetch', async () => {
  const user = await fetch('https://api.graniteaccess.xyz/oidc/me', {
      headers: {
          Authorization: `Bearer ${accessToken}`
      },
      method: 'POST'
  })
  console.log(user);
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