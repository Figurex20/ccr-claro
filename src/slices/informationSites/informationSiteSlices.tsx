import { BACKEND } from '@/const/backend'
import { InformationSite, InformationSiteState } from '@/interface/interfaces'
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

const initialState: InformationSiteState = {
  saveInformationSite: {
    docs: [
      {
        _id: '',
        nameEnter: '',
        siteID: '',
        siteIDLTE: '',
        mnemonico: '',
        noPlaca: '',
        name: '',
        direccion: '',
        provincia: '',
        canton: '',
        distrito: '',
        latitud: '',
        longitud: '',
        propietarioSite: '',
        categoria: '',
        idTorrero: '',
        tecnologia: '',
        funcionalidad: '',
        tipoRBS: '',
        bscInicial: '',
        rncInicial: '',
        medio: '',
        equipoTX: '',
        sitioOrigen: '',
        dependencias: '',
        criticidad: '',
        redudancia: '',
        nMedidor: '',
        companiaElectrica: '',
        conexionDefinitivaTempoal: '',
        aa: '',
        mg: '',
        capacidadKW: '',
        tanqueCombustibleLitros: '',
        bancoBateriasExterno: '',
        autonomiaTotalHoras: '',
        tipoTorre: '',
        alturaTorre: '',
        casetaContenedor: '',
        zona: '',
        zonaEricsson: '',
        supervisorRBS: '',
        supervisorEnergia: '',
        llaveOYM: '',
        cantidadCorporativos: '',
        etiqueta: '',
        golden: '',
        olt: '',
        rputerPE: '',
        site2G: '',
        site3G: '',
        site4G: '',
        ampliacion2G: '',
        ampliacion3G: '',
        ampliacion4G: '',
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

export const InformationSiteSlice = createSlice({
  name: 'informationSite',
  initialState,
  reducers: {
    setiInformationSite: (state, action) => {
      state.saveInformationSite = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setiInformationSite } = InformationSiteSlice.actions

export const selectInformationSite = (state: RootState) => state.incomes

const informationSiteRedux = InformationSiteSlice.reducer

export { informationSiteRedux }

export class informationSiteController {
  static fetchAllInformationSites = async (props:any, numberPage: number, dataProp?:any) => {
    try {
      const nunPage: number = numberPage
      const result = await axios.get(`${BACKEND}/incomes/?numberPage=${nunPage}&dataSearch=${dataProp}`)
      props(selectInformationSite(result.data))
      const success = true
      return success
    } catch (error) {
      const result:any = (error as AxiosError).response?.data
      Swal.fire({
        icon: 'error',
        title: result.message,
        text: 'try to put a day after what was requested',
        footer: result.status
      })
    }
  }

  static createInformationSite = async (data:InformationSite) => {
    const headers1 = headers()
    const saveInformationSite:InformationSite = {
      nameEnter: '',
      siteID: '',
      siteIDLTE: '',
      mnemonico: '',
      noPlaca: '',
      name: '',
      direccion: '',
      provincia: '',
      canton: '',
      distrito: '',
      latitud: '',
      longitud: '',
      propietarioSite: '',
      categoria: '',
      idTorrero: '',
      tecnologia: '',
      funcionalidad: '',
      tipoRBS: '',
      bscInicial: '',
      rncInicial: '',
      medio: '',
      equipoTX: '',
      sitioOrigen: '',
      dependencias: '',
      criticidad: '',
      redudancia: '',
      nMedidor: '',
      companiaElectrica: '',
      conexionDefinitivaTempoal: '',
      aa: '',
      mg: '',
      capacidadKW: '',
      tanqueCombustibleLitros: '',
      bancoBateriasExterno: '',
      autonomiaTotalHoras: '',
      tipoTorre: '',
      alturaTorre: '',
      casetaContenedor: '',
      zona: '',
      zonaEricsson: '',
      supervisorRBS: '',
      supervisorEnergia: '',
      llaveOYM: '',
      cantidadCorporativos: '',
      etiqueta: '',
      golden: '',
      olt: '',
      rputerPE: '',
      site2G: '',
      site3G: '',
      site4G: '',
      ampliacion2G: '',
      ampliacion3G: '',
      ampliacion4G: ''

    }
    await axios.post(`${BACKEND}/incomes`, saveInformationSite, {
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

  static getInformationSite = async (id:string) => {
    try {
      const result = await axios.get(`${BACKEND}/incomes/${id}`)
      return result.data.incomes.docs[0]
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

  static updateDataIncome = async (id:string, data:InformationSite) => {
    try {
      const headers1 = headers()
      const saveInformationSite:InformationSite = {
        nameEnter: '',
        siteID: '',
        siteIDLTE: '',
        mnemonico: '',
        noPlaca: '',
        name: '',
        direccion: '',
        provincia: '',
        canton: '',
        distrito: '',
        latitud: '',
        longitud: '',
        propietarioSite: '',
        categoria: '',
        idTorrero: '',
        tecnologia: '',
        funcionalidad: '',
        tipoRBS: '',
        bscInicial: '',
        rncInicial: '',
        medio: '',
        equipoTX: '',
        sitioOrigen: '',
        dependencias: '',
        criticidad: '',
        redudancia: '',
        nMedidor: '',
        companiaElectrica: '',
        conexionDefinitivaTempoal: '',
        aa: '',
        mg: '',
        capacidadKW: '',
        tanqueCombustibleLitros: '',
        bancoBateriasExterno: '',
        autonomiaTotalHoras: '',
        tipoTorre: '',
        alturaTorre: '',
        casetaContenedor: '',
        zona: '',
        zonaEricsson: '',
        supervisorRBS: '',
        supervisorEnergia: '',
        llaveOYM: '',
        cantidadCorporativos: '',
        etiqueta: '',
        golden: '',
        olt: '',
        rputerPE: '',
        site2G: '',
        site3G: '',
        site4G: '',
        ampliacion2G: '',
        ampliacion3G: '',
        ampliacion4G: ''

      }
      await axios.put(`${BACKEND}/incomes`, saveInformationSite, {
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
}
