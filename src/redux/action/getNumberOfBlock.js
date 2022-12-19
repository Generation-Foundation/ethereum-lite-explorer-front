import etherApi from "../etherApi";
import { addressDataActions } from "../reducer/addressData";

function getNumberOfBlock(account) {
  return async (dispatch) => {
    try {
      const datas = await etherApi.post("/", {
        jsonrpc: "2.0",
        method: "eth_blockNumber",
        params: [],
        id: 44,
      });

      let hex = parseInt(datas.data.result, 16);

      dispatch(addressDataActions.getNumberOfBlock({ numberOfBlock: hex }));
    } catch (error) {
      console.error(error);
    }
  };
}

export const getBalance = { getNumberOfBlock };
