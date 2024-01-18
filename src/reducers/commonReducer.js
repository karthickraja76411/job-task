import { createSlice } from "@reduxjs/toolkit";


const commonSlice = createSlice({
    name: "commonSlice",
    initialState: {
        personalData: null,
        productData: [],
        totalPrice: 0,
    },
    reducers: {
        addPersonalData: (state, action) => { state.personalData = action.payload },
        addProductData: (state, action) => {
            state.productData = [...state.productData, action.payload];
            state.totalPrice = state.totalPrice + action.payload.qty * action.payload.rate;
            state.personalData = { ...state.personalData, ac_amt: state.totalPrice }
        },
        deleteProduct: (state, action) => {
            var deleterow;
            const deleteData = state.productData.filter((x, i) => {
                if (i !== action.payload) {
                    return x
                } else {
                    deleterow = x
                    return x
                }
            })
            state.productData = deleteData
            state.totalPrice = state.totalPrice - deleterow.qty * deleterow.rate;
            state.personalData = { ...state.personalData, ac_amt: state.totalPrice }
        },
        defaultSet: (state, action) => {
            state.productData = [];
            state.personalData = null;
            state.totalPrice = 0;
        },
    }
})


export const { addPersonalData, addProductData, deleteProduct, defaultSet } = commonSlice.actions;

export default commonSlice.reducer;