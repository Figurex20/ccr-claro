import { RootState } from '@/redux/store'
import { createSlice } from '@reduxjs/toolkit'

const initialState: any = {

}
export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setDateSearch: (state, action) => {
      state.saveDataSearch = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setDateSearch } = dataSlice.actions

export const selectDateSearch = (state: RootState) => state.data

const dataRedux = dataSlice.reducer

export { dataRedux }

export class dataReduxController {
  static saveDateSearch = async (dispatch:any, data:any) => {
    dispatch(setDateSearch(data))
  }
}
