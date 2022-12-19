import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    blockInfo : null,
    unixTimestamp : null,
    blockTimeago : null,
    txInfo : null,
    blockTxs: null, 
    blockTxsTimeago: null, 
};

const blockDataSlice = createSlice({
    name: "blockData",
    initialState,
    reducers: {
        getBlockInfo(state, action){
            state.blockInfo = action.payload.blockInfo
        },
        getBlockUnixTimestamep(state, action){
            state.unixTimestamp = action.payload.unixTimestamp
        },        
        getBlockTimeago(state, action){
            state.blockTimeago = action.payload.blockTimeago
        },

        dbBlockTxs(state, action){
            state.blockTxs = action.payload.blockTxs        
        },
        dbBlockTxsTimeago(state, action){
            state.blockTxsTimeago = action.payload.blockTxsTimeago
        },
    }
})

export const blockDataActions = blockDataSlice.actions
export default blockDataSlice.reducer