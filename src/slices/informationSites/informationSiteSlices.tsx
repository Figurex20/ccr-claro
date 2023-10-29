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
        _id: '1111111111111111',
        nameEnter: '1111111111111111',
        siteID: '1111111111111111',
        siteIDLTE: '1111111111111111',
        mnemonico: '1111111111111111',
        noPlaca: '1111111111111111',
        name: '1111111111111111',
        direccion: '1111111111111111',
        provincia: '1111111111111111',
        canton: '1111111111111111',
        distrito: '1111111111111111',
        latitud: '1111111111111111',
        longitud: '1111111111111111',
        propietarioSite: '1111111111111111',
        categoria: '1111111111111111',
        idTorrero: '1111111111111111',
        tecnologia: '1111111111111111',
        funcionalidad: '1111111111111111',
        tipoRBS: '1111111111111111',
        bscInicial: '1111111111111111',
        rncInicial: '1111111111111111',
        medio: '1111111111111111',
        equipoTX: '1111111111111111',
        sitioOrigen: '1111111111111111',
        dependencias: '1111111111111111',
        criticidad: '1111111111111111',
        redudancia: '1111111111111111',
        nMedidor: '1111111111111111',
        companiaElectrica: '1111111111111111',
        conexionDefinitivaTempoal: '1111111111111111',
        aa: '1111111111111111',
        mg: '1111111111111111',
        capacidadKW: '1111111111111111',
        tanqueCombustibleLitros: '1111111111111111',
        bancoBateriasExterno: '1111111111111111',
        autonomiaTotalHoras: '1111111111111111',
        tipoTorre: '1111111111111111',
        alturaTorre: '1111111111111111',
        casetaContenedor: '1111111111111111',
        zona: '1111111111111111',
        zonaEricsson: '1111111111111111',
        supervisorRBS: '',
        supervisorEnergia: '1111111111111111',
        llaveOYM: '',
        cantidadCorporativos: '1111111111111111',
        etiqueta: '1111111111111111',
        golden: '1111111111111111',
        olt: '1111111111111111',
        rputerPE: '1111111111111111',
        site2G: '1111111111111111',
        site3G: '1111111111111111',
        site4G: '1111111111111111',
        ampliacion2G: '1111111111111111',
        ampliacion3G: '1111111111111111',
        ampliacion4G: '1111111111111111',
        createdAt: '1111111111111111',
        updatedAt: '1111111111111111',
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

export const selectInformationSite = (state: RootState) => state.informationSite

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
