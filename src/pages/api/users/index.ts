import { NextApiRequest, NextApiResponse } from 'next'
import { dbConnect } from '../utils'
import { UserController } from '../controllers/user.contollers'
import NextCors from 'nextjs-cors'
import { AuthController } from '../controllers/auth.controllers'
import { respondoControllers } from '@/interface/interfaces'
export default async function PUT (req: NextApiRequest, res:NextApiResponse) {
  await dbConnect()
  const { method } = req

  if (method === 'PUT') {
    const methods = ['PUT']
    await NextCors(req, res, {
      methods,
      origin: '*',
      optionsSuccessStatus: 200
    })

    if (req.body.option === 'changePassword' || req.body.option === 'resetPassword') {
      try {
        const response:respondoControllers = await UserController.userChangepassword(req, res)
        if (response.status === 400) throw Error(response.message)
        if (response.status === 200) {
          res.status(200).json({ message: response.message, status: response.status })
        }
      } catch (error) {
        const result = (error as DOMException).message
        return res.status(500).json({ message: result, status: 500 })
      }
    } else {
      try {
        const response:respondoControllers = await UserController.updateUser(req, res)
        if (response.status === 400) throw Error(response.message)
        if (response.status === 200) {
          res.status(200).json({ message: response.message, status: response.status })
        }
      } catch (error) {
        const result = (error as DOMException).message
        return res.status(500).json({ message: result, status: 500 })
      }
    }
  }

  if (method === 'GET') {
    const methods = ['GET']
    await NextCors(req, res, {
      methods,
      origin: '*',
      optionsSuccessStatus: 200
    })
    try {
      const response:respondoControllers = await UserController.getAllUsers(req, res)
      if (response.status === 400) throw Error(response.message)
      if (response.status === 200) {
        return res.status(200).json({ message: response.message, status: response.status })
      }
    } catch (error) {
      const result = (error as DOMException).message
      return res.status(500).json({ message: result, status: 500 })
    }
  }

  if (method === 'POST') {
    const methods = ['POST']
    await NextCors(req, res, {
      methods,
      origin: '*',
      optionsSuccessStatus: 200
    })
    try {
      const response:respondoControllers = await AuthController.signUp(req, res)
      if (response.status === 400) throw Error(response.message)
      if (response.status === 200) {
        return res.status(200).json({ message: response.message, status: response.status })
      }
    } catch (error) {
      const result = (error as DOMException).message
      return res.status(500).json({ message: result, status: 500 })
    }
  }

  if (method === 'DELETE') {
    const methods = ['DELETE']
    await NextCors(req, res, {
      methods,
      origin: '*',
      optionsSuccessStatus: 200
    })
    try {
      const response:respondoControllers = await UserController.deleteUser(req)
      if (response.status === 400) throw Error(response.message)
      if (response.status === 200) {
        return res.status(200).json({ message: response.message, status: response.status })
      }
    } catch (error) {
      const result = (error as DOMException).message
      return res.status(500).json({ message: result, status: 500 })
    }
  }
}
