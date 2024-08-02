import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IinitialState {
    expandInt: boolean;
    expandDom: boolean;
}

const initialState: IinitialState = {
    expandInt: false,
    expandDom: false
}

const appSlice = createSlice({
    name: "appSlice",
    initialState,
    reducers: {
        intHover: (state, action: PayloadAction<boolean>) => {
            state.expandInt = action.payload;
        },
        domHover: (state, action: PayloadAction<boolean>) => {
            state.expandDom = action.payload;
        }
    }
});

export const {intHover, domHover} = appSlice.actions;
export default appSlice.reducer;