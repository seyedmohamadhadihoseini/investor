"use client"
import { configureStore } from '@reduxjs/toolkit'
import RowReducer from "./features/row/rowSlice"
import { Provider } from "react-redux"
export const store = configureStore({
    reducer: {
        row: RowReducer
    },
})


export type DataTableState = ReturnType<typeof store.getState>
export type DataTableDispatch = typeof store.dispatch

export default function ReduxDatatabeProvider({ children }: { children: React.ReactNode }) {

    return <Provider store={store}>
        {children}
    </Provider>
}