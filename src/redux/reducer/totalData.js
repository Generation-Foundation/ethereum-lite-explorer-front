import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    allTxs: null,
    allTxsTimeago: null,
    allBlocks: null,
    allBlocksTimeago: null,
};

const totalDataSlice = createSlice({
    name: "totalData",
    initialState,
    reducers: {
        dbAllTxs(state, action){
            state.allTxs = action.payload.allTxs
        },
        dbAllTxsTimeago(state, action){
            state.allTxsTimeago = action.payload.allTxsTimeago
        },
        dbAllBlocks(state, action){
            state.allBlocks = action.payload.allBlocks
        },
        dbAllBlocksTimeago(state, action){
            state.allBlocksTimeago = action.payload.allBlocksTimeago
        },        
    }
})

export const totalDataActions = totalDataSlice.actions
export default totalDataSlice.reducer