import dbApi from "../dbApi";
import { addressDataActions } from "../reducer/addressData";

function dbAddressTxsNumApi(params) {
  return async (dispatch) => {
    try {
      const datas = await dbApi.post("dbAddressTxsNum", {
        address: params,
      });

      dispatch(
        addressDataActions.dbAddressTxsNum({
          addressTsxNum: datas.data.accountTxsNum,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
}

export const dbAddressTxsNum = { dbAddressTxsNumApi };
