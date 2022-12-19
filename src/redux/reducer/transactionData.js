import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    txInfo : null,
    txDbInfo : null,
    txReceiptInfo : null,
    txDecodeInputData : "",
    txTimeago : null,
    airdropLogTopic : false
};

const transactionDataSlice = createSlice({
    name: "transactionData",
    initialState,
    reducers: {
        getTxInfo(state, action){
            state.txInfo = action.payload.txInfo
        },
        getTxDbInfo(state, action){
            state.txDbInfo = action.payload.txDbInfo
        },
        getTxReceiptInfo(state, action){
            state.txReceiptInfo = action.payload.txReceiptInfo
        },
        getTxDecodeInputData(state, action){
            state.txDecodeInputData = action.payload.txDecodeInputData
        },
        getTxTimeage(state, action){
            state.txTimeago = action.payload.txTimeago
        },
        airdropLogTopic(state, action){
            state.airdropLogTopic = action.payload.airdropLogTopic
        },

    }
})

export const transactionDataActions = transactionDataSlice.actions
export default transactionDataSlice.reducer