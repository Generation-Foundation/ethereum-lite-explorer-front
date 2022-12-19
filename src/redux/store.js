import { configureStore } from '@reduxjs/toolkit'
import mainpageDataReducer from './reducer/mainpageData'
import totalDataReducer from './reducer/totalData';
import blockDataReducer from './reducer/blockData';
import addressDataReducer from './reducer/addressData';
import transactionDataReducer from './reducer/transactionData';
import chartDataReducer from './reducer/chartData';

const store = configureStore({
    reducer:{
        totalData : totalDataReducer,
        blockData : blockDataReducer,
        addressData : addressDataReducer,
        transactionData : transactionDataReducer,
        mainpageData : mainpageDataReducer,
        chartData : chartDataReducer
    }
});


export default store;