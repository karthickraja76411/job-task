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
            let matchRow;
            const matchData = state.productData.filter(x => {
                if (x.item_name === action.payload.item_name) {
                    matchRow = x
                    return false;
                }
                else {
                    return x
                }
            })
            if (matchRow) {
                const qty = +matchRow.qty + +action.payload.qty;
                const convert = { ...matchRow, qty };
                state.productData = [...matchData, convert];
                state.totalPrice = state.totalPrice + action.payload.qty * convert.rate;
                state.personalData = { ...state.personalData, ac_amt: state.totalPrice }
            } else {
                state.productData = [...state.productData, action.payload];
                state.totalPrice = state.totalPrice + action.payload.qty * action.payload.rate;
                state.personalData = { ...state.personalData, ac_amt: state.totalPrice }
            }
        },
        deleteProduct: (state, action) => {
            var deleterow;
            const deleteData = state.productData.filter((x, i) => {
                if (i !== action.payload) {
                    return x
                } else {
                    deleterow = x
                    // return x
                    return false;
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
        updateProductData: (state, action) => {
            state.productData = state.productData.map(x => {
                if (x.sr_no === action.payload.sr_no) {
                    return { ...x, ...action.payload };
                } else {
                    return x;
                }
            });

            state.totalPrice = 0;
            state.productData.map(x => state.totalPrice += x.qty * x.rate)

        }
    }
})


export const { addPersonalData, addProductData, deleteProduct, defaultSet, updateProductData } = commonSlice.actions;

export default commonSlice.reducer;