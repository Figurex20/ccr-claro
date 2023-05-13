import { BACKEND } from '@/const/backend'
import { Login } from '@/interface/interfaces'
import axios, { AxiosError } from 'axios'
import Swal from 'sweetalert2'

export class userController {
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
}
