import { BACKEND } from '@/const/backend'
import { RootState } from '@/redux/store'
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Swal from 'sweetalert2'

// const headers = () => {
//   const headers: {} = {
//     'Content-Type': 'application/json',
//     x_access_token: sessionStorage.getItem('token')
//   }

//   return headers
// }

export interface IncomeState {
    listincomes: []
}

const initialState: IncomeState = {
  listincomes: []
}

export const incomeSlice = createSlice({
  name: 'incomes',
  initialState,
  reducers: {
    setiIncomeList: (state, action) => {
      state.listincomes = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setiIncomeList } = incomeSlice.actions

export const selectValueIncomes = (state: RootState) => state.incomes

const incomeRedux = incomeSlice.reducer

export { incomeRedux }

export class incomesController {
  static fetchAllIncomes = async (props:any, data?:string, numberPage?:string) => {
    try {
      const result = await axios.get(`${BACKEND}/income/`)
      console.log(result)
      console.log(typeof props)
      props(setiIncomeList(result.data))
      const success = true
      return success
    } catch (error) {
      const result = (error as DOMException).message
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: result,
        footer: '<a href="">Why do I have this issue?</a>'
      })
    }
  }
}
