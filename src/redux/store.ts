"use client"
import { configureStore } from '@reduxjs/toolkit'
import SidebarReducer from "./features/sidebar/sidebarSlice"
const store = configureStore({
    reducer: {
        sidebar: SidebarReducer
    },
})
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch