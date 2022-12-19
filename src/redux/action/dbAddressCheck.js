import dbApi from "../dbApi";
import { addressDataActions } from "../reducer/addressData";

function dbAddressCheckApi(params) {
  return async (dispatch) => {
    try {
      const datas = await dbApi.post("/dbAddressCheck", {
        address: params,
      });

      let isContract = [];

      if (datas.data === "1") {
        isContract[0] = true;
      } else {
        isContract[0] = false;
      }

      dispatch(
        addressDataActions.dbAddressCheck({ addressCheck: isContract[0] })
      );
    } catch (error) {
      console.error(error);
    }
  };
}

export const dbAddressCheck = { dbAddressCheckApi };
