import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  addressTxs: null,
  addressTxsTimeago: null,
  addressCheck: null,
  accountBalance: null,
  numberOfBlock: null,
  addressTsxNum: null,
};

const addressDataSlice = createSlice({
  name: "addressData",
  initialState,
  reducers: {
    dbAddressTxs(state, action) {
      state.addressTxs = action.payload.addressTxs;
      //console.log("====",state.addressTxs)
    },
    dbAddressTxsTimeago(state, action) {
      state.addressTxsTimeago = action.payload.addressTxsTimeago;
    },
    dbAddressCheck(state, action) {
      state.addressCheck = action.payload.addressCheck;
    },
    getAccountBalance(state, action) {
      state.accountBalance = action.payload.accountBalance;
    },
    getNumberOfBlock(state, action) {
      state.numberOfBlock = action.payload.numberOfBlock;
    },
    dbAddressTxsNum(state, action) {
      state.addressTsxNum = action.payload.addressTsxNum;
    },
  },
});

export const addressDataActions = addressDataSlice.actions;
export default addressDataSlice.reducer;
