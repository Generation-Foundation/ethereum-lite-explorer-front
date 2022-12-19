import dbApi from "../dbApi";
import { chartDataActions } from "../reducer/chartData";

function dbChartMonthlyTxsByDateApi() {
  return async (dispatch) => {
    try {
      const datas = await dbApi.get("/chartMonthlyTxsByDate");
      console.log(datas.data);

      dispatch(
        chartDataActions.dbChartMonthlyTxsByDate({
          chartMonthlyTxsByDate: datas.data,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
}

export const dbChartMonthlyTxsByDate = { dbChartMonthlyTxsByDateApi };
