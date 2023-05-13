import jwt from 'jsonwebtoken'
import { secretWotds } from '../config'
import { UserModel } from '../models/modelUser'
import { RoleModel } from '../models/modelRole'
// import { Response, Request } from 'express'
import { serialize } from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

export class AuthController {
  static signUp = async (req: NextApiRequest, res: NextApiResponse) => {
    const { userName, email, password, role, name, lastname, confirmPassword } = req.body

    const equalPassword = password === confirmPassword

    if (!equalPassword) {
      return res.status(400).json({ message: 'the passwords are not the same' })
    }

    const UserAlreadyExists = UserModel.findOne({ userName })

    if (!UserAlreadyExists) {
      return res.status(400).json({ message: 'User duplicated' })
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
      const token = jwt.sign({ id: 'pepe' }, secretWotds.LOGIN, {
        expiresIn: 84600 // 24h
      })

      return res.status(200).json({ message: 'Succes to create User', newUser: token })
      // return res.status(200).json({ message: 'Succes to create User', newUser: saveUser });
    } catch (error) {
      const result = (error as DOMException).message
      return res.status(404).json({ message: result })
    }
  }

  static signNin = async (req: NextApiRequest, res: NextApiResponse) => {
    const userFound = await UserModel.findOne({ userName: req.body.userName }).populate('roles')

    if (!userFound) return res.status(404).json({ message: 'User no found' })

    const userPassword = String(userFound.password)

    const matchPassword = await UserModel.comparePassword(req.body.password, userPassword)

    if (!matchPassword) return res.status(401).json({ token: null, message: 'Invalid Password' })

    const token = jwt.sign({ userFound }, secretWotds.LOGIN, {
      expiresIn: 84600 // 24h
    })
    const serealized = serialize('userLogin', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: '/user/login'
    })

    res.setHeader('set-cookie', serealized)

    res.json({
      // token,
      user: userFound
      // role: userFound.role,
      // user: userFound.userName,
      // id: userFound._id,
      // resetPassword: userFound.resetPassword,
    })
  }
}
