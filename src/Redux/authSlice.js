import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   isAuthenticated: false,
//   token: null,
//   user: null
// };
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
    isAuthenticated: !!token,
    token: token,
    user: user ? JSON.parse(user) : null
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        logout: (state) => {
           // debugger;
            state.isAuthenticated = false;
            state.token = null;
            state.user = null;

            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
    }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
