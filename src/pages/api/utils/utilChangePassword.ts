import { UserModel } from '../models/modelUser'

export class utilChangePassword {
  static changePassword = async (user: any, dataProps:any) => {
    // Claro+2023

    // find user by userName
    const userFound = user

    if (!userFound.resetPassword) {
      const { data } = dataProps
      // compare password
      const matchPassword = await UserModel.comparePassword(data.oldPassword, userFound.password)

      // if password not match
      if (!matchPassword) return { message: 'Contraseña vieja invalida', status: 400 }

      const equalPassword = data.newPassword === data.confirmNewPassword

      if (!equalPassword) {
        return { message: 'Las contraseñas no son iguales', status: 400 }
      }

      const saveNewpassword = {
        password: await UserModel.encryptPassword(data.newPassword)
      }

      await UserModel.findByIdAndUpdate(userFound._id, saveNewpassword, { new: true })

      return { message: 'Password reseted', status: 200 }
    } else {
      const newPassword = 'password'

      const saveNewpassword = {
        password: await UserModel.encryptPassword(newPassword),
        resetPassword: false,
        recoverpassword: true
      }

      await UserModel.findByIdAndUpdate(userFound._id, saveNewpassword, { new: true })

      return { message: 'Password reseted, new password: password', status: 200 }
    }
  }
}
