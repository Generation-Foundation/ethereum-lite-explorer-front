import dbApi from "../dbApi";
import { format } from "timeago.js";
import { addressDataActions } from "../reducer/addressData";

function dbAddressTxsApi(params, page) {
  return async (dispatch) => {
    try {
      const datas = await dbApi.post(`/dbAddressTxs?page=${page}`, {
        address: params,
      });

      let txsArr = [];
      let timeagoArr = [];

      if (datas.data.length < 51) {
        for (let i = 0; i < datas.data.length; i++) {
          txsArr.push(datas.data[i]);
        }
        for (let i = 0; i < datas.data.length; i++) {
          let date = new Date()
          let year = date.getUTCFullYear();
          let month = "0" + (date.getUTCMonth()+1);
          let day = "0" + date.getUTCDate();
          let hour = "0" + date.getUTCHours();
          let minute = "0" + date.getUTCMinutes();
          let second = "0" + date.getUTCSeconds();
          let time = year + "-" + month.substr(-2) + "-" + day.substr(-2) + " " + hour.substr(-2) + ":" + minute.substr(-2) + ":" + second.substr(-2);
    
          let timeago = format(datas.data[i].time_stamp, "en_US", { relativeDate: time });

          if (timeago === "just now") {
            let second = datas.data[i].time_stamp.slice(-2);
            let date = new Date();
            let second2 = "0" + date.getSeconds();
            let timeago2 = second2 - second + " seconds ago";
            timeagoArr.push(timeago2);
          } else {
            timeagoArr.push(timeago);
          }
        }
      } else {
        for (let i = 0; i < 50; i++) {
          txsArr.push(datas.data[i]);
        }
        for (let i = 0; i < 50; i++) {
          console.log(datas.data[i].time_stamp);
          let date = new Date()
          let year = date.getUTCFullYear();
          let month = "0" + (date.getUTCMonth()+1);
          let day = "0" + date.getUTCDate();
          let hour = "0" + date.getUTCHours();
          let minute = "0" + date.getUTCMinutes();
          let second = "0" + date.getUTCSeconds();
          let time = year + "-" + month.substr(-2) + "-" + day.substr(-2) + " " + hour.substr(-2) + ":" + minute.substr(-2) + ":" + second.substr(-2);
    
          let timeago = format(datas.data[i].time_stamp, "en_US", { relativeDate: time });
          //console.log("여기 타임어고",timeago)

          if (timeago === "just now") {
            let second = datas.data[i].time_stamp.slice(-2);
            let date = new Date();
            let second2 = "0" + date.getSeconds();
            let timeago2 = second2 - second + " seconds ago";
            timeagoArr.push(timeago2);
          } else {
            timeagoArr.push(timeago);
          }
        }
      }

      dispatch(addressDataActions.dbAddressTxs({ addressTxs: txsArr }));
      dispatch(
        addressDataActions.dbAddressTxsTimeago({
          addressTxsTimeago: timeagoArr,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };
}

export const dbAddressTxs = { dbAddressTxsApi };
