"use client"
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
export type DialogType = ""|"ADD_PERSON" | "EDIT_PERSON" | "ADD_CONTRACT"|
"EDIT_CONTRACT" | "EDIT_PROFITRECORD" | "EDIT_REFERRER_PROFIT_RECORD"
type StateType ={
    open:boolean,
    type:DialogType,
    id:string
}
const initialState:StateType= {
    open : false,
    type:"",
    id:""
}
export const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        SetDialogOpen: (state, action: PayloadAction<boolean>) => {
            state.open = action.payload;
        },
        SetDialogType: (state, action: PayloadAction<DialogType>) => {
            state.type = action.payload;
        },
        setDialogObjectId:(state,action:PayloadAction<string>)=>{
            state.id = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { SetDialogOpen,SetDialogType ,setDialogObjectId} = dialogSlice.actions

export default dialogSlice.reducer