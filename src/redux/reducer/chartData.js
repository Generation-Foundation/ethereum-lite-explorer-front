import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  chartAllTxsByDate: null,
  chartMonthlyTxsByDate: null,
  chartWeeklyTxsByDate: null,
};

const chartDataSlice = createSlice({
  name: "chartData",
  initialState,
  reducers: {
    dbChartAllTxsByDate(state, action) {
      state.chartAllTxsByDate = action.payload.chartAllTxsByDate;
    },
    dbChartMonthlyTxsByDate(state, action) {
      state.chartMonthlyTxsByDate = action.payload.chartMonthlyTxsByDate;
    },
    dbChartWeeklyTxsByDate(state, action) {
      state.chartWeeklyTxsByDate = action.payload.chartWeeklyTxsByDate;
    },
  },
});

export const chartDataActions = chartDataSlice.actions;
export default chartDataSlice.reducer;
