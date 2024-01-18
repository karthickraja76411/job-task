import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "./reducers/commonReducer";


const store = configureStore({
    reducer: {
        common: commonReducer,
    }
})



export default store;