import dbApi from '../dbApi'
import { mainpageDataActions } from '../reducer/mainpageData'

function getTokenDataApi() {
    
    return async (dispatch) => {
        try {
            const datas = await dbApi("/tokenData")
            //console.log("토큰데이터",datas.data.data[0])
            
            dispatch(mainpageDataActions.getTokenData({tokenData : datas.data.data[0]}))
        } 
        catch(error) {
            console.error(error)
        }
    }
}

export const getTokenData = {getTokenDataApi}