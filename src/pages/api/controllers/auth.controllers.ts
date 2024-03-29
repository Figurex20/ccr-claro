import jwt from 'jsonwebtoken'
import { UserModel } from '../models/modelUser'
import { RoleModel } from '../models/modelRole'
import { serialize } from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

export class AuthController {
  static signUp = async (req: NextApiRequest, res: NextApiResponse) => {
    const { userName, email, password, role, name, lastname, confirmPassword, recoverpassword } = req.body

    const equalPassword = password === confirmPassword

    if (!equalPassword) {
      return { message: 'the passwords are not the same', status: 400 }
    }

    const UserAlreadyExists = UserModel.findOne({ userName })

    if (!UserAlreadyExists) {
      return { message: 'User duplicated', status: 400 }
    }

    try {
      const newUser = new UserModel({
        userName,
        email,
        role,
        name,
        lastname,
        recoverpassword,
        password: await UserModel.encryptPassword(password)
      })

      const newRole: any = role.toLowerCase()

      if (newRole === 'admin') {
        const roles = ['admin', 'moderator']
        const foundRoles = await RoleModel.find({ name: { $in: roles } })
        if (!foundRoles) throw Error('Something went wrong with role admin and role moderator')
        newUser.roles = foundRoles.map((role) => role._id)
      }

      if (newRole === 'moderator') {
        const roles = ['moderator']
        const foundRoles = await RoleModel.find({ name: { $in: roles } })
        if (!foundRoles) throw Error('Something went wrong with role moderator')
        newUser.roles = foundRoles.map((role) => role._id)
      }

      if (newRole === 'user') {
        const roles = ['user']
        const foundRoles = await RoleModel.find({ name: { $in: roles } })
        if (!foundRoles) throw Error('Something went wrong with role user')
        newUser.roles = foundRoles.map((role:any) => role._id)
      }

      await newUser.save()
      return { message: 'Succes to create User', status: 200 }
    } catch (error) {
      const result = (error as DOMException).message
      return { message: result, status: 400 }
    }
  }

  static signNin = async (req: NextApiRequest, res: NextApiResponse) => {
    const userFound = await UserModel.findOne({ userName: req.body.userName }).populate('roles')

    if (!userFound) return { message: 'Incorrect username or password' }

    const userPassword = String(userFound.password)

    const matchPassword = await UserModel.comparePassword(req.body.password, userPassword)

    if (!matchPassword) return { message: 'Incorrect username or password' }

    if (!process.env.LOGIN) return { message: 'Incorrect username or password' }

    const token = jwt.sign({
      userName: userFound.userName,
      role: userFound.role,
      name: userFound.name,
      _id: userFound._id,
      resetPassword: userFound.resetPassword
    }, process.env.LOGIN, {
      expiresIn: 43200 // 12h
    })
    const serealized = serialize('userLogin', token, {
      httpOnly: false,
      sameSite: 'strict',
      secure: false,
      maxAge: 43200,
      path: '/'
    })
    return { serealized, user: userFound }
  }
}
