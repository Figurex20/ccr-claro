import { UserModel } from '../models/modelUser'
// import { utils } from '../middlewares/utils'
// import { RoleModel } from '../models/modelRole'
import { NextApiRequest, NextApiResponse } from 'next'
import { utilChangePassword } from '../utils/utilChangePassword'
import { valitadeCookies } from '../utils/valitadedToken'
// import { token } from '../../../interface/interfaces'

export class UserController {
  static getAllUsers = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const users = await UserModel.find()
      if (!users) throw Error('Users not found')
      return { message: users, status: 200 }
    } catch (error) {
      const result = (error as DOMException).message
      return { message: result, status: 400 }
    }
  }

  static getUser = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const uniqueUser = await UserModel.findById(req.query.id)
      if (!uniqueUser) throw Error('User not found')
      res.status(200).json(uniqueUser)
    } catch (error) {
      const result = (error as DOMException).message
      return res.status(404).json({ message: result })
    }
  }

  static userChangepassword = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const dataToken: any = await valitadeCookies(req.cookies)

      if (dataToken.message) throw Error(dataToken.message)

      if (req.body.option === 'changePassword') {
        const respond = await utilChangePassword.changePassword(dataToken.token.userName, req.body)
        if (respond!.status === 200) {
          return { message: respond!.message, status: 200 }
        } else {
          return { status: 400, message: respond!.message }
        }
      }

      if (req.body.option === 'resetPassword') {
        try {
          const userFound:any = await UserModel.findOne({ userName: dataToken.token.userName }).populate('roles')
          userFound.resetPassword = true
          const respond = await utilChangePassword.changePassword(userFound, req.body)
          return { message: respond.message, status: 200 }
        } catch (error) {
          const result = (error as DOMException).message
          return { status: 400, message: result }
        }
      }

      await UserModel.findByIdAndUpdate(req.query.id, req.body, { new: true })
      return { status: 200, message: 'password change' }
    } catch (error) {
      const result = (error as DOMException).message
      return { message: result, status: 400 }
    }
  }

  static updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // if (req.body.role === 'admin') {
      //   const rol = ['admin', 'moderator']
      //   const uniqueUser = await UserModel.findById(req.query.id)
      //   const foundRoles = await RoleModel.find({ name: { $in: rol } })
      //   if (!uniqueUser) throw Error('Rol not found')
      //   uniqueUser.roles = foundRoles.map((role) => role._id)
      //   await uniqueUser.save()
      // }

      // if (req.body.role === 'moderator') {
      //   const rol = ['moderator']
      //   const uniqueUser = await UserModel.findById(req.query.id)
      //   const foundRoles = await RoleModel.find({ name: { $in: rol } })
      //   if (!uniqueUser) throw Error('Rol not found')
      //   uniqueUser.roles = foundRoles.map((role) => role._id)
      //   await uniqueUser.save()
      //   return { message: 'User created', status: 200 }
      // }

      // if (req.body.role === 'user') {
      //   const rol = ['user']
      //   const uniqueUser = await UserModel.findById(req.query.id)
      //   const foundRoles = await RoleModel.find({ name: { $in: rol } })
      //   if (!uniqueUser) throw Error('Rol not found')
      //   uniqueUser.roles = foundRoles.map((role) => role._id)
      //   await uniqueUser.save()
      //   return { message: 'User created', status: 200 }
      // }
      console.log(req.body)
      await UserModel.findByIdAndUpdate(req.body.idUser, req.body, { new: true })
      return { message: 'User updated', status: 200 }
    } catch (error) {
      const result = (error as DOMException).message
      return { message: result, status: 400 }
    }
  }
}
