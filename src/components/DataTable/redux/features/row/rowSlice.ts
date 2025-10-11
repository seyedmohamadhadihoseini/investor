import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const rowSlice = createSlice({
  name: 'row',
  initialState: {
    selectedId:""
  },
  reducers: {

    changeSelectedId: (state, action: PayloadAction<string>) => {
      state.selectedId = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeSelectedId } = rowSlice.actions

export default rowSlice.reducer