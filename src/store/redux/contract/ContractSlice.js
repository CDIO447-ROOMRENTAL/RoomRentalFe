// ContractSlice.js
import { createSlice } from "@reduxjs/toolkit";

const contractSlice = createSlice({
    name: "contract",
    initialState: {
        contract: null,
        isCreating: false,
        error: null,
    },
    reducers: {
        createContractStart: (state) => {
            state.contract = null;
            state.isCreating = true;
            state.error = null;
        },
        createContractSuccess: (state, action) => {
            state.contract = action.payload;
            state.isCreating = false;
            state.error = null;
        },
        createContractFailed: (state, action) => {
            state.contract = null;
            state.isCreating = false;
            state.error = action.payload; // Pass error message to state
        },
    }
});

export const { createContractStart, createContractSuccess, createContractFailed } = contractSlice.actions;
export default contractSlice.reducer;
