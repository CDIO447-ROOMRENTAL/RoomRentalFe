import { createSlice } from "@reduxjs/toolkit";
const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profile: {
            user: null,
            isFetching: false,
            error: false,
            success: false,
        },
    },
    reducers: {
        profileStart: (state) => {
            state.profile.user = null;
            state.profile.success = false;
            state.profile.isFetching = true;
            state.profile.error = false;
        },
        profileSuccess: (state, action) => {
            state.profile.user = action.payload;
            state.profile.isFetching = false;
            state.profile.success = true;
            state.profile.error = false;
        },
        profileFailed: (state) => {
            state.profile.user = null;
            state.profile.success = false;
            state.profile.isFetching = false;
            state.profile.error = true;
        },
    }
});
export const { profileStart, profileSuccess, profileFailed } = profileSlice.actions;
export default profileSlice.reducer;