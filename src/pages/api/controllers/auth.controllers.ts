import jwt from 'jsonwebtoken'
import { UserModel } from '../models/modelUser'
import { RoleModel } from '../models/modelRole'
import { serialize } from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'
export class AuthController {
  static signUp = async (req: NextApiRequest, res: NextApiResponse) => {
    const { userName, email, password, role, name, lastname, confirmPassword } = req.body

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
        password: await UserModel.encryptPassword(password)
      })

      if (role === 'admin') {
        const roles = ['admin', 'moderator']
        const foundRoles = await RoleModel.find({ name: { $in: roles } })
        if (!foundRoles) throw Error('Something went wrong with role admin and role moderator')
        newUser.roles = foundRoles.map((role) => role._id)
      }

      if (role === 'moderator') {
        const roles = ['moderator']
        const foundRoles = await RoleModel.find({ name: { $in: roles } })
        if (!foundRoles) throw Error('Something went wrong with role moderator')
        newUser.roles = foundRoles.map((role) => role._id)
      }

      if (role === 'user') {
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
      _id: userFound._id
    }, process.env.LOGIN, {
      expiresIn: 7200 // 2h
    })
    const serealized = serialize('userLogin', token, {
      httpOnly: false,
      sameSite: 'strict',
      secure: false,
      maxAge: 7200,
      path: '/'
    })
    return { serealized, user: userFound }
  }
}
