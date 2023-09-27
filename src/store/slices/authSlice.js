import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null
}

export const AuthSlice = createSlice({
    name: "AuthSlice",
    initialState,
    reducers: {
        setCurrentUser: (state, {payload}) => {
            state.currentUser = payload
        }
    }
})

export const {setCurrentUser} = AuthSlice.actions
export default AuthSlice.reducer