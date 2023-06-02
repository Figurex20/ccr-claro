import { UserModel } from '../models/modelUser'

export class utilChangePassword {
  static changePassword = async (user: any, dataProps:any) => {
    // Claro+2023

    // find user by userName
    const userFound:any = await UserModel.findOne({ userName: user }).populate('roles')

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
      console.log(saveNewpassword)
      console.log(userFound._id)

      await UserModel.findByIdAndUpdate(userFound._id, saveNewpassword, { new: true })

      return { message: 'Password reseted', status: 200 }
    }
    // else {
    //   const equalPassword = req.data.newPassword === req.data.confirmNewPassword

    //   if (!equalPassword) {
    //     return { message: 'the passwords are not the same', status: 400 }
    //   }

    //   const saveNewpassword = {
    //     password: await UserModel.encryptPassword(req.data.newPassword),
    //     resetPassword: false
    //   }

    //   await UserModel.findByIdAndUpdate(req.data._id, saveNewpassword, { new: true })

    //   return { Message: 'Password changed', status: 200 }
    // }
  }
}
