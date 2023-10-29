import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAccessToken = createAsyncThunk('user/access_token_fetch', async (refreshToken) => {
  const params = {
    grant_type: 'refresh_token',
    refreshToken,
    client_id: process.env.REACT_APP_CLIENT_ID,
  }
  const user = await fetch('https://api.graniteaccess.xyz/oidc/token', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params,
    method: 'POST',
  })
  return user.json();
})

export const fetchUser = createAsyncThunk('user/fetch', async (accessToken) => {
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
    access_token: '',
    access_token_status: 'idle',
    access_token_error: null,
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
    .addCase(fetchAccessToken.pending, (state) => {
        state.access_token_status = 'loading'
    })
    .addCase(fetchAccessToken.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.access_token_status = action.payload
    })
    .addCase(fetchAccessToken.rejected, (state, action) => {
        state.access_token_status = 'failed'
        state.access_token_error = action.error.message
    })
  }
})

export default userSlice.reducer;