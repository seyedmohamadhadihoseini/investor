import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const panelSlice = createSlice({
  name: 'panel',
  initialState: {
    ContractId: "",
    referrerContractId:"",
    ForceUpdate: true
  },
  reducers: {

    changeContractId: (state, action: PayloadAction<string>) => {
      state.ContractId = action.payload;
    },
    changeReferrerContractId: (state, action: PayloadAction<string>) => {
      state.referrerContractId = action.payload;
    },
    makeForceUpdate(state) {
      state.ForceUpdate = !state.ForceUpdate;
    }
  },
})

// Action creators are generated for each case reducer function
export const { changeContractId,changeReferrerContractId,makeForceUpdate } = panelSlice.actions

export default panelSlice.reducer