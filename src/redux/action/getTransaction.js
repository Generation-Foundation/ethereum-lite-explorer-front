import etherApi from "../etherApi"
import dbApi from '../dbApi'
import { format } from 'timeago.js';
import { blockDataActions } from '../reducer/blockData'
import { addressDataActions } from '../reducer/addressData'
import { transactionDataActions } from '../reducer/transactionData'

function getTransactionApi(txHash) {
    console.log(txHash)
    return async (dispatch) => {
        try {
            const datas = await etherApi.post('/', {
                "jsonrpc":"2.0",
                "method":"eth_getTransactionByHash",
                "params":[txHash],
                "id":9
            })
            const receipt = await etherApi.post('/', {
                "jsonrpc":"2.0",
                "method":"eth_getTransactionReceipt",
                "params":[txHash],
                "id":9
            })

            const dbDatas = await dbApi.post("/dbTxDetails", {txHash})
            let date = new Date()
            let year = date.getFullYear();
            let month = "0" + (date.getMonth()+1);
            let day = "0" + date.getDate();
            let hour = "0" + date.getHours();
            let minute = "0" + date.getMinutes();
            let second = "0" + date.getSeconds();
            let time = year + "-" + month.substr(-2) + "-" + day.substr(-2) + " " + hour.substr(-2) + ":" + minute.substr(-2) + ":" + second.substr(-2);
      
            let timeago = format(dbDatas.data[0].time_stamp, "en_US", { relativeDate: time });

            if(timeago === 'just now'){
                console.log("just now")
                let second = (dbDatas.data[0].time_stamp).slice(-2)

                let date = new Date();
                let second2 = "0" + date.getSeconds();
                let timeago2 = (second2 - second) + " seconds ago"
                console.log(timeago2)
    
                dispatch(transactionDataActions.getTxTimeage({txTimeago : timeago2}))
            } else {
                dispatch(transactionDataActions.getTxTimeage({txTimeago : timeago}))
            }

            const decodeInputData = await dbApi.post('/dbInputDataDecode', {
                inputData : datas.data.result.input
            })

            const checkAddress = await dbApi.post("/dbAddressCheck", {
                address : datas.data.result.to
            })

            let isContract = []

            if(checkAddress.data === "1"){
                isContract[0] = true
            } else {
                isContract[0] = false
            }

            dispatch(addressDataActions.dbAddressCheck({addressCheck : isContract[0]}))


            //console.log(dbDatas.data[0])
            console.log("tx 데이터", datas.data.result)
            console.log("tx receipt", receipt.data.result)
            console.log(decodeInputData.data)

            if(receipt.data.result.logs[0] != null && receipt.data.result.logs[0].topics[0] === "0x47cee97cb7acd717b3c0aa1435d004cd5b3c8c57d70dbceb4e4458bbd60e39d4"){
                console.log("Airdrop")
                dispatch(transactionDataActions.airdropLogTopic({airdropLogTopic : true}))
            } else {
                console.log("에어드랍 아님")
            }

            dispatch(transactionDataActions.getTxInfo({txInfo : datas.data.result}))
            dispatch(blockDataActions.getBlockInfo({blockInfo : null}))
            dispatch(addressDataActions.getAccountBalance({accountBalance : null}))
            dispatch(transactionDataActions.getTxDbInfo({txDbInfo : dbDatas.data[0]}))
            dispatch(transactionDataActions.getTxReceiptInfo({txReceiptInfo : receipt.data.result}))
            dispatch(transactionDataActions.getTxDecodeInputData({txDecodeInputData : decodeInputData.data}))
        } 
        catch(error) {
            console.error(error)
        }
    }
}

export const getTransaction = {getTransactionApi}