import etherApi from "../etherApi";
import { blockDataActions } from "../reducer/blockData";
import { addressDataActions } from "../reducer/addressData";
import { transactionDataActions } from "../reducer/transactionData";

function getBalanceApi(account) {
  //console.log(account)
  return async (dispatch) => {
    try {
      const datas = await etherApi.post("/", {
        jsonrpc: "2.0",
        method: "eth_getBalance",
        params: [account, "latest"],
        id: 9,
      });
      //console.log(datas.data.result)
      let hex = parseInt(datas.data.result, 16);
      //console.log(hex)
      let fixed = hex / 10 ** 18;
      //console.log(fixed)

      dispatch(addressDataActions.getAccountBalance({ accountBalance: fixed }));
      dispatch(transactionDataActions.getTxInfo({ txInfo: null }));
      dispatch(blockDataActions.getBlockInfo({ blockInfo: null }));
    } catch (error) {
      console.error(error);
    }
  };
}

export const getBalance = { getBalanceApi };
