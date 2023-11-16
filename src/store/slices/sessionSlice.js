import { createSlice } from "@reduxjs/toolkit";

const SessionSlice = createSlice({
  name: 'SessionSlice',
  initialState: {
    session: false
  },
  reducers: {
    signIn() {
      return {
        session: true
      }
    },
    signOut() {
      return {
        session: false
      }
    }
  }
})

export const { signIn, signOut } = SessionSlice.actions;
export default SessionSlice.reducer;
