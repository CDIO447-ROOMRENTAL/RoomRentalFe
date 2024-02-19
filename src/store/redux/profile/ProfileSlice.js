// ProfileSlice.js
import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        user: null,
        isFetching: false,
        error: null,
    },
    reducers: {
        profileStart: (state) => {
            state.user = null;
            state.isFetching = true;
            state.error = null;
        },
        profileSuccess: (state, action) => {
            state.user = action.payload;
            state.isFetching = false;
            state.error = null;
        },
        profileFailed: (state, action) => {
            state.user = null;
            state.isFetching = false;
            state.error = action.payload; // Pass error message to state
        },
    }
});

export const { profileStart, profileSuccess, profileFailed } = profileSlice.actions;
export default profileSlice.reducer;
