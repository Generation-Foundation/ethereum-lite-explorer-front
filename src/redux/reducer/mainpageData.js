import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  // 위쪽 대시보드
  tokenData: null,
  totalTxsNum: null,
  allAddressArr: null,
  
  // 아래쪽 대시보드
  latestBlocks: null,
  latestBlocksTimeago: null,
  latestTxs: null,
  latestTxsTimeago: null,
};

const mainpageDataSlice = createSlice({
  name: "mainpageData",
  initialState,
  reducers: {
    // 위쪽 대시보드
    getTokenData(state, action) {
      state.tokenData = action.payload.tokenData;
    },
    dbTotalTxsNumber(state, action) {
      state.totalTxsNum = action.payload.totalTxsNum;
    },
    dbAllAddressArr(state, action) {
      state.allAddressArr = action.payload.allAddressArr;
    },

    // 아래쪽 대시보드
    dbLatestBlocks(state, action) {
      state.latestBlocks = action.payload.latestBlocks;
    },
    dbLatestBlocksTimeago(state, action) {
      state.latestBlocksTimeago = action.payload.latestBlocksTimeago;
    },
    dbLatestTxs(state, action) {
      state.latestTxs = action.payload.latestTxs;
    },
    dbLatestTxsTimeago(state, action) {
      state.latestTxsTimeago = action.payload.latestTxsTimeago;
    },
  },
});

export const mainpageDataActions = mainpageDataSlice.actions;
export default mainpageDataSlice.reducer;
