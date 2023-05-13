import { BACKEND } from '@/const/backend'
import { Login } from '@/interface/interfaces'
import axios, { AxiosError } from 'axios'
import Swal from 'sweetalert2'

export class userController {
  static login = async (newLogin:Login) => {
    try {
      const result = await axios.post(`${BACKEND}/auth/login`, newLogin)
      console.log()
      Swal.fire({
        icon: 'success',
        title: 'Acceso concedido',
        text: 'Exito al ingresar'
      })
      return result
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.message
        if (message === 'User no found') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usuario o Contraseña incorrectas'
          })
        }
      }
    }
  }
}
