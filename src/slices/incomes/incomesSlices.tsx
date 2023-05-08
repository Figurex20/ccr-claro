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

export interface IncomeState {
 saveIncomes:{
  docs: [{
  '_id': string,
  'name': string,
  'site': string,
  'whatdo': string,
  'rda': string,
  'exit': boolean,
  'nameEnter': string,
  'dateEnter': string,
  'comments': string,
  'createdAt': string,
  'updatedAt': string,
  '__v': 0
}
],
  hasPrevious: boolean,
  hasNext: boolean,
  totalDocs: number
},

}

const initialState: IncomeState = {
  saveIncomes: {
    docs: [
      {
        _id: '',
        name: '',
        site: '',
        whatdo: '',
        rda: '',
        exit: false,
        nameEnter: '',
        dateEnter: '',
        comments: '',
        createdAt: '',
        updatedAt: '',
        __v: 0
      }
    ],
    hasPrevious: false,
    hasNext: false,
    totalDocs: 1
  }

}
export const incomeSlice = createSlice({
  name: 'incomes',
  initialState,
  reducers: {
    setiIncomeList: (state, action) => {
      state.saveIncomes = action.payload
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
      console.log(result.data)
      props(setiIncomeList(result.data))
      const success = true
      return success
    } catch (error) {
      const result = (error as DOMException).message
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: result
      })
    }
  }
}
