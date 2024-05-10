import { BACKEND } from '@/const/backend'
import { LogsiteFormState, saveInformationSite } from '@/interface/interfaces'
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

const initialState: LogsiteFormState = {
  saveLogsite: {
    docs: [
      {
        _id: '_id',
        Incidencia_Falla: 'Incidencia_Falla',
        site: 'site',
        name: 'name',
        cause: 'cause',
        affect: 'affect',
        close: false,
        tracking: [{
          coment: 'Comentario',
          dateEnter: '2024-05-08'
        },
        {
          coment: 'Comentario',
          dateEnter: '2024-05-08'
        }],
        comments: 'comments',
        dateEnter: 'dateEnter',
        dateExit: 'dateExit',
        zone: 'zone',
        province: 'province',
        canton: 'canton',
        distrito: 'distrito',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
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

export const logSiteSlices = createSlice({
  name: 'informationSite',
  initialState,
  reducers: {
    setiInformationSite: (state, action) => {
      state.saveLogsite = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setiInformationSite } = logSiteSlices.actions

export const selectLogSiteSlices = (state: RootState) => state.logSiteSlices

const logSiteSlicesRedux = logSiteSlices.reducer

export { logSiteSlicesRedux }

export class informationSiteController {
  static readonly fetchAllInformationSites = async (props:any, numberPage: number, dataProp?:any) => {
    try {
      const nunPage: number = numberPage
      const result = await axios.get(`${BACKEND}/informationSite/?numberPage=${nunPage}`)

      props(setiInformationSite(result.data.site))
      const success = true
      return success
    } catch (error) {
      const result:any = (error as AxiosError).response?.data
      Swal.fire({
        icon: 'error',
        title: result.message,
        text: 'ERROR TO LOAD DATA',
        footer: result.status
      })
    }
  }

  static readonly createInformationSite = async (data:saveInformationSite) => {
    const headers1 = headers()
    const saveInformationSite:saveInformationSite = data

    await axios.post(`${BACKEND}/informationSite`, saveInformationSite, {
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
  }

  static readonly getInformationSite = async (props:any, id:any) => {
    try {
      console.log(id)
      const result = await axios.get(`${BACKEND}/informationSite/?id=${id.searchIncome}`)
      props(setiInformationSite(result.data.site))
      const success = true
      return success
    } catch (error) {
      const result:any = (error as AxiosError).response?.data
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: result,
        footer: result
      })
    }
  }

  static readonly updateDataIncome = async (data:saveInformationSite) => {
    try {
      const headers1 = headers()
      const saveInformationSite:saveInformationSite = data
      console.log('saveInformationSite: ', saveInformationSite)

      await axios.put(`${BACKEND}/informationSite`, saveInformationSite, {
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
      const result:any = (error as AxiosError).response?.data
      const response = result.message ? result.message : 'Error al tratar de actualizar'
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: response,
        footer: result.status
      })
    }
  }

  static readonly deleteInformationSites = async (data:string) => {
    try {
      await axios.delete(`${BACKEND}/informationSite/${data}`)
      return
    } catch (error) {
      const result:any = (error as AxiosError).response?.data
      Swal.fire({
        icon: 'error',
        title: result.message,
        text: 'ERROR TO DELETE SITE',
        footer: result.status
      })
    }
  }
}
