import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const sideSlice = createSlice({
  name: 'sidebar',
  initialState: {
    path: "persons",
  },
  reducers: {
    
    changePath: (state, action:PayloadAction<string>) => {
      state.path = state.path;
    },
  },
})

// Action creators are generated for each case reducer function
export const { changePath } = sideSlice.actions

export default sideSlice.reducer