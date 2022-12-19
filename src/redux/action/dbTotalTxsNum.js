import dbApi from "../dbApi";
import { mainpageDataActions } from "../reducer/mainpageData";

function dbTotalTxsNumApi() {
  return async (dispatch) => {
    try {
      const datas = await dbApi.get("/dbTotalTxsNum");

      dispatch(
        mainpageDataActions.dbTotalTxsNumber({
          totalTxsNum: datas.data[0].result,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };
}

export const dbTotalTxsNum = { dbTotalTxsNumApi };
