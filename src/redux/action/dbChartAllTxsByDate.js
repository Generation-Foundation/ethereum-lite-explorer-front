import dbApi from '../dbApi'
import { chartDataActions } from '../reducer/chartData'

function dbChartAllTxsByDateApi() {
    return async (dispatch) => {
        try {
            const datas = await dbApi.get('/chartAllTxsByDate')
            console.log(datas.data)

            dispatch(chartDataActions.dbChartAllTxsByDate({ chartAllTxsByDate : datas.data}))
        } 
        catch(error) {
            console.error(error)
        }
    }
}

export const dbChartAllTxsByDate = {dbChartAllTxsByDateApi}
