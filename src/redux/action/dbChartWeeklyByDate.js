import dbApi from "../dbApi";
import { chartDataActions } from "../reducer/chartData";

function dbChartWeeklyTxsByDateApi() {
  return async (dispatch) => {
    try {
      const datas = await dbApi.get("chartWeeklyTxsByDate");
      dispatch(
        chartDataActions.dbChartWeeklyTxsByDate({
          chartWeeklyTxsByDate: datas.data,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
}

export const dbChartWeeklyTxsByDate = { dbChartWeeklyTxsByDateApi };
