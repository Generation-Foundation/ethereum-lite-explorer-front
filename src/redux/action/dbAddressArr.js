import dbApi from "../dbApi";
import { mainpageDataActions } from '../reducer/mainpageData'

function dbAddressArrApi() {
    return async (dispatch) => {
        try {
            const fromDatas = await dbApi.get("/dbFromAddress");
            const toDatas = await dbApi.get("/dbToAddress")

            let fromAdressArr = []
            let toAdressArr = []

            for(let i = 0; i<fromDatas.data.length; i++){
                fromAdressArr.push(fromDatas.data[i].fromAddress)
            }

            for(let i = 0; i<toDatas.data.length; i++){
                toAdressArr.push(toDatas.data[i].toAddress)
            }

            let merged = fromAdressArr.concat(toAdressArr);
            let unique = merged.filter((item, pos) => merged.indexOf(item) === pos);

            dispatch(mainpageDataActions.dbAllAddressArr({ allAddressArr: unique }))

        } catch (error) {
            console.error(error);
        }
    };
}

export const dbAddressArr = { dbAddressArrApi };
