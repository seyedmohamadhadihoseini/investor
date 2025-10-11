"use client"
import { configureStore } from '@reduxjs/toolkit'
import SidebarReducer from "./features/sidebar/sidebarSlice"
import DialogReducer from "./features/dialog/dialogSlice"
import PanelReducer from "./features/panel/panelSlice"
import { Provider } from "react-redux"
export const store = configureStore({
    reducer: {
        sidebar: SidebarReducer,
        dialog: DialogReducer,
        panel: PanelReducer
    },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default function ReduxProvider({ children }: { children: React.ReactNode }) {

    return <Provider store={store}>
        {children}
    </Provider>
}