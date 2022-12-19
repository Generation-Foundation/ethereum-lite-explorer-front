// import etherApi from "../etherApi"

// function getGasPriceApi() {
//     return async (dispatch) => {
//         try {
//             const datas = await etherApi.post('/', {
//                 "jsonrpc":"2.0",
//                 "method":"eth_gasPrice",
//                 "params":[],
//                 "id":9
//         })
//             //console.log("가스비",datas.data.result)
//             let hex = datas.data.result;
//             let dec = parseInt(hex, 16);
//             let fixed = (dec/10**9).toFixed(1)

//             //console.log(fixed)
//             dispatch({
//                 type : "GET_GAS_PRICE",
//                 payload : {fixed}
//             })
//         } 
//         catch(error) {
//             console.error(error)
//         }
//     }
// }

// export const getGasPrice = {getGasPriceApi}