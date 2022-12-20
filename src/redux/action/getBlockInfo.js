// eslint-disable-next-line
import etherApi from "../etherApi";
import dbApi from '../dbApi'
import { format } from "timeago.js";
import { blockDataActions } from "../reducer/blockData";
import { addressDataActions } from "../reducer/addressData";
import { transactionDataActions } from "../reducer/transactionData";
// import  TimeAgo  from "javascript-time-ago"
// import en from 'javascript-time-ago/locale/en'
// TimeAgo.addDefaultLocale(en)

function getBlockInfoApi(blockNumber) {
  return async (dispatch) => {
    try {
      let txHex = Number(blockNumber).toString(16);

      const datas = await etherApi.post("/", {
        jsonrpc: "2.0",
        method: "eth_getBlockByNumber",
        params: ["0x" + txHex, true],
        id: 9,
      });
      console.log(blockNumber)
      const dbDatas = await dbApi.post("/dbBlockDetails", {blockNumber})

      let date = new Date()
      let year = date.getFullYear();
      let month = "0" + (date.getMonth()+1);
      let day = "0" + date.getDate();
      let hour = "0" + date.getHours();
      let minute = "0" + date.getMinutes();
      let second = "0" + date.getSeconds();
      let time = year + "-" + month.substr(-2) + "-" + day.substr(-2) + " " + hour.substr(-2) + ":" + minute.substr(-2) + ":" + second.substr(-2);

      let timeago = format(dbDatas.data[0].time_stamp, "en_US", { relativeDate: time });

      if (timeago === "just now") {
        let date = new Date();
        let second = (dbDatas.data[0].time_stamp).slice(-2)
        let second2 = "0" + date.getSeconds();

        let timeago2 = second2 - second;

        if (timeago2 < 0) {
          dispatch(
            blockDataActions.getBlockTimeago({
              blockTimeago: timeago2 + 60 + " seconds ago",
            })
          );
        } else {
          dispatch(
            blockDataActions.getBlockTimeago({
              blockTimeago: timeago2 + " seconds ago",
            })
          );
        }
      } else {
        dispatch(blockDataActions.getBlockTimeago({ blockTimeago: timeago }));
      }

      dispatch(blockDataActions.getBlockInfo({ blockInfo: datas.data.result }));
      dispatch(transactionDataActions.getTxInfo({ txInfo: null }));
      dispatch(addressDataActions.getAccountBalance({ accountBalance: null }));
      dispatch(blockDataActions.getBlockUnixTimestamep({ unixTimestamp: dbDatas.data[0].time_stamp }));
    } catch (error) {
      console.log(error);
    }
  };
}

export const getBlockInfo = { getBlockInfoApi };
