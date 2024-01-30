import { NextApiRequest, NextApiResponse } from 'next'
import { dbConnect } from '../utils'
import { UserController } from '../controllers/user.contollers'
import NextCors from 'nextjs-cors'
// import { AuthController } from '../controllers/auth.controllers'
import { respondoControllers } from '@/interface/interfaces'
export default async function PUT (req: NextApiRequest, res:NextApiResponse) {
  await dbConnect()
  const { method } = req

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
