
import { RootState } from '@/redux/store'
import { createSlice } from '@reduxjs/toolkit'
import { BACKEND } from '@/const/backend'
import { AxiosUser, Login } from '@/interface/interfaces'
import axios, { AxiosError, AxiosResponse } from 'axios'
import Swal from 'sweetalert2'
const headers = () => {
  const headers: {} = {
    'Content-Type': 'application/json',
    x_access_token: sessionStorage.getItem('token')

  }
  return headers
}

const initialState: any = {

}
export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.saveUsers = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUsers } = userSlice.actions

export const selectUsers = (state: RootState) => state.users

const usersRedux = userSlice.reducer

export { usersRedux }

export class userController {
  static fetchAllUsers = async (dispatch:any) => {
    const users:AxiosResponse<AxiosUser> = await axios.get(`${BACKEND}/users`)
    console.log(users.data)
    dispatch(setUsers(users.data.message))
  }

  static login = async (newLogin:Login) => {
    try {
      await axios.post(`${BACKEND}/auth/login`, newLogin)
      Swal.fire({
        icon: 'success',
        title: 'Acceso concedido',
        text: 'Exito al ingresar'
      })
      return
    } catch (error) {
      if (error instanceof AxiosError) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Usuario o Contraseña incorrectas'
        })
      }
    }
  }

  static updateUser = async (data:any, userName:any, option:any) => {
    try {
      const headers1 = headers()
      if (option === 'resetPassword') {
        const newUser = {
          option
        }

        const respond = await axios.put(`${BACKEND}/users`, newUser, {
          headers: headers1
        })

        alert(respond.data.status)
        alert(respond.data.newpassword)
        const success = true
        return success
      }

      if (option === 'changePassword') {
        const changePassword = {
          option,
          data,
          userName
        }

        try {
          await axios.put(`${BACKEND}/users`, changePassword, {
            headers: headers1
          })
          Swal.fire({
            icon: 'success',
            title: 'Confirmacion',
            text: 'La contraseña se cambio'
          })
          const success = true
          return success
        } catch (error) {
          const result:any = (error as AxiosError).response?.data
          console.log(result)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${result.message} ${result.status}`
          })
          return
        }
      }

      const newUser = {
        userName: data.userName,
        email: data.email,
        password: data.password,
        role: data.role,
        name: data.name,
        lastname: data.lastname
      }

      await axios.put(`${BACKEND}/users/${data._id}`, newUser, {
        headers: headers1
      })
      alert('Successfully ')
      const success = true
      return success
    } catch (err) {
      console.log(err)
    }
  }

  static createUser = async (data:any) => {
    const createUser:any = data
    const success = !!createUser
    return success
  }
}
