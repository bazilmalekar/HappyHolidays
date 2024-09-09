import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IinitialState {
    expandInt: boolean;
    expandDom: boolean;
    expandHon: boolean;
    displayPopupForm: boolean;
}

const initialState: IinitialState = {
    expandInt: false,
    expandDom: false,
    expandHon: false,
    displayPopupForm: false
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
        },
        honHover: (state, action: PayloadAction<boolean>) => {
            state.expandHon = action.payload;
        },
        popUpToggle: (state, action: PayloadAction<boolean>) => {
            state.displayPopupForm = action.payload;
        }
    }
});

export const { intHover, domHover, honHover, popUpToggle } = appSlice.actions;
export default appSlice.reducer;