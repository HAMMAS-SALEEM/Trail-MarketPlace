import { createSlice } from "@reduxjs/toolkit";

const RenderSlice = createSlice({
  name: 'RenderSlice',
  initialState: {
    session: true
  },
  reducers: {
    renderStatus() {
      return {
        session: false
      }
    }
  }
})

export const { renderStatus } = RenderSlice.actions;
export default RenderSlice.reducer;
