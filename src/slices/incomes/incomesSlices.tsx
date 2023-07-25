import { BACKEND } from '@/const/backend'
import { IncomeState, SaveDataNewIncome } from '@/interface/interfaces'
import { RootState } from '@/redux/store'
import { createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import Swal from 'sweetalert2'

const headers = () => {
  const headers: {} = {
    'Content-Type': 'application/json',
    x_access_token: sessionStorage.getItem('token')

  }
  return headers
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
    totalDocs: 1,
    limit: 0,
    totalPages: 0,
    page: 0,
    pagingCounter: 0,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null
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
  static fetchAllIncomes = async (props:any, numberPage: number, dataProp?:any) => {
    try {
      const nunPage: number = numberPage

      if (dataProp) {
        const data = dataProp.saveDataSearch ? dataProp.saveDataSearch : dataProp

        if (data.enter === true) {
          console.log('data.enter: ', data.enter)
          const result = await axios.get(`${BACKEND}/incomes/?numberPage=${nunPage}&onlyEnter=true`)
          props(setiIncomeList(result.data))
          const success = true
          return success
        }

        if (data.exit === true) {
          const result = await axios.get(`${BACKEND}/incomes/?numberPage=${nunPage}&onlyEnd=true`)
          props(setiIncomeList(result.data))
          const success = true
          return success
        }

        if (data.searchIncome) {
          const regex = /\D/

          if (regex.test(data.searchIncome)) {
            const result = await axios.get(
            `${BACKEND}/incomes/?numberPage=${numberPage}&site=${data.searchIncome}`
            )
            props(setiIncomeList(result.data))
            const success = true
            return success
          } else {
            const result = await axios.get(
            `${BACKEND}/incomes/?numberPage=${numberPage}&rda=${data.searchIncome}`
            )
            props(setiIncomeList(result.data))
            const success = true
            return success
          }
        }

        if (data.dateStart) {
          const result = await axios.get(
          `${BACKEND}/incomes/?numberPage=${nunPage}&startDate=${data.dateStart}&endDate=${data.dateEnd}`
          )
          props(setiIncomeList(result.data))
          const success = true
          return success
        }
      }
      const result = await axios.get(`${BACKEND}/incomes/?numberPage=${nunPage}&dataSearch=${dataProp}`)
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

  static newIncome = async (data: SaveDataNewIncome) => {
    try {
      const headers1 = headers()

      const saveNewIncome:SaveDataNewIncome = {
        name: data.name.toUpperCase(),
        site: data.site.toUpperCase(),
        whatdo: data.whatdo.toUpperCase(),
        rda: data.rda,
        exit: data.exit,
        comments: data.comments,
        dateEnter: data.dateEnter
      }

      await axios.post(`${BACKEND}/incomes`, saveNewIncome, {
        headers: headers1
      })
      Swal.fire({
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      const success = 'success'
      return success
    } catch (error) {
      const result = (error as DOMException).message
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: result
      })
      return result
    }
  }

  static getDataIncome = async (id:string) => {
    try {
      const result = await axios.get(`${BACKEND}/incomes/${id}`)
      return result
    } catch (error) {
      const result:any = (error as AxiosError).response?.data
      if (result.message) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: result.message,
          footer: result.status
        })
      }
    }
  }

  static updateDataIncome = async (id:string, updatedOldIncome:SaveDataNewIncome) => {
    try {
      const headers1 = headers()
      await axios.put(`${BACKEND}/incomes/${id}`, updatedOldIncome, {
        headers: headers1
      })
      Swal.fire({
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      const success = 'success'
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
