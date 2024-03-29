import { UserModel } from '../models/modelUser'
import { NextApiRequest, NextApiResponse } from 'next'
import { utilChangePassword } from '../utils/utilChangePassword'
import { valitadeCookies } from '../utils/valitadedToken'
import { RoleModel } from '../models/modelRole'

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
      const dataToken: any = await valitadeCookies(req.cookies)

      if (dataToken.message) throw Error(dataToken.message)

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
        const userFound:any = await UserModel.findOne({ userName: dataToken.token.userName }).populate('roles')
        userFound.resetPassword = false
        const respond = await utilChangePassword.changePassword(userFound, req.body)

        if (respond!.status === 200) {
          return { message: respond!.message, status: 200 }
        } else {
          return { status: 400, message: respond!.message }
        }
      }

      if (req.body.option === 'resetPassword') {
        const uniqueUser = await UserModel.findById(dataToken.token._id)

        const roles = await RoleModel.find({ _id: { $in: uniqueUser!.roles } })

        if (roles[0].name === 'admin') {
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
      const dataToken: any = await valitadeCookies(req.cookies)

      if (dataToken.message) throw Error(dataToken.message)
      const uniqueUser = await UserModel.findById(dataToken.token._id)

      const roles = await RoleModel.find({ _id: { $in: uniqueUser!.roles } })

      if (roles[0].name === 'admin') {
        const role: any = req.body.role.toLowerCase()

        if (role === 'admin') {
          const roles = ['admin']
          const uniqueUser = await UserModel.findById(req.body.idUser)
          const foundRoles = await RoleModel.find({ name: { $in: roles } })
          if (!foundRoles) throw Error('Something went wrong with role admin and role moderator')
        uniqueUser!.roles = foundRoles.map((role) => role._id)
        await uniqueUser!.save()
        }

        if (role === 'moderator') {
          const roles = ['moderator']
          const uniqueUser = await UserModel.findById(req.body.idUser)
          const foundRoles = await RoleModel.find({ name: { $in: roles } })
          if (!foundRoles) throw Error('Something went wrong with role moderator')
        uniqueUser!.roles = foundRoles.map((role) => role._id)
        await uniqueUser!.save()
        }

        if (role === 'user') {
          const roles = ['user']
          const uniqueUser = await UserModel.findById(req.body.idUser)
          const foundRoles = await RoleModel.find({ name: { $in: roles } })
          if (!foundRoles) throw Error('Something went wrong with role user')
        uniqueUser!.roles = foundRoles.map((role) => role._id)
        await uniqueUser!.save()
        }

        await UserModel.findByIdAndUpdate(req.body.idUser, req.body, { new: true })
        return { message: 'User updated', status: 200 }
      } else {
        return { message: 'User not have permissions', status: 400 }
      }
    } catch (error) {
      const result = (error as DOMException).message
      return { message: result, status: 400 }
    }
  }

  static deleteUser = async (req: NextApiRequest) => {
    try {
      const dataToken: any = await valitadeCookies(req.cookies)

      if (dataToken.message) throw Error(dataToken.message)
      const uniqueUser = await UserModel.findById(dataToken.token._id)

      const roles = await RoleModel.find({ _id: { $in: uniqueUser!.roles } })
      console.log('roles: ', roles[0].name)

      if (roles[0].name === 'admin') {
        await UserModel.findByIdAndDelete(req.query.id)
        return { message: 'User deleted', status: 200 }
      } else {
        return { message: 'User not have perssions', status: 400 }
      }
    } catch (error) {
      const result = (error as DOMException).message
      return { message: result, status: 400 }
    }
  }
}
