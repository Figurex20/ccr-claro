import { UserModel } from '../models/modelUser'
// import { utils } from '../middlewares/utils'
import { RoleModel } from '../models/modelRole'
import { NextApiRequest, NextApiResponse } from 'next'

export class UserController {
  static getAllUsers = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const users = await UserModel.find()
      if (!users) throw Error('Users not found')
      res.status(200).send(users)
    } catch (error) {
      const result = (error as DOMException).message
      return res.status(404).json({ message: result })
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

  static deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await UserModel.findByIdAndDelete(req.query.id)
      res.status(200).json({ message: 'User elimited' })
    } catch (error) {
      const result = (error as DOMException).message
      return res.status(404).json({ message: result })
    }
  }

  static userChangepassword = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // if (req.body.option === 'changePassword') {
      //   const respond = await utils.changePassword(req.body)
      //   if (respond.status === 200) {
      //     return res.status(200).json(respond.message)
      //   } else {
      //     return res
      //       .status(400)
      //       .json({ status: 'something wrong with changed password', message: respond.message })
      //   }
      // }

      await UserModel.findByIdAndUpdate(req.query.id, req.body, { new: true })
      res.status(200).json({ status: 'User updated' })
    } catch (error) {
      const result = (error as DOMException).message
      return res.status(404).json({ message: result })
    }
  }

  static updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // if (req.body.option === 'resetPassword') {
      //   try {
      //     const respond = await utils.newPasswordAmin(req.query.id)
      //     return res.status(200).json(respond)
      //   } catch (error) {
      //     const result = (error as DOMException).message
      //     return res.status(404).json({ message: result })
      //   }
      // }

      if (req.body.role === 'admin') {
        const rol = ['admin', 'moderator']
        const uniqueUser = await UserModel.findById(req.query.id)
        const foundRoles = await RoleModel.find({ name: { $in: rol } })
        if (!uniqueUser) return res.status(404).json({ message: 'Rol not found' })
        uniqueUser.roles = foundRoles.map((role) => role._id)
        await uniqueUser.save()
      }

      console.log(req.body.role)

      if (req.body.role === 'moderator') {
        const rol = ['moderator']
        const uniqueUser = await UserModel.findById(req.query.id)
        const foundRoles = await RoleModel.find({ name: { $in: rol } })
        if (!uniqueUser) return res.status(404).json({ message: 'Rol not found' })
        uniqueUser.roles = foundRoles.map((role) => role._id)
        await uniqueUser.save()
      }

      if (req.body.role === 'user') {
        const rol = ['user']
        const uniqueUser = await UserModel.findById(req.query.id)
        const foundRoles = await RoleModel.find({ name: { $in: rol } })
        if (!uniqueUser) return res.status(404).json({ message: 'Rol not found' })
        uniqueUser.roles = foundRoles.map((role) => role._id)
        await uniqueUser.save()
      }

      await UserModel.findByIdAndUpdate(req.query.id, req.body, { new: true })
      res.status(200).json({ status: 'User updated' })
    } catch (error) {
      const result = (error as DOMException).message
      return res.status(404).json({ message: result })
    }
  }
}
