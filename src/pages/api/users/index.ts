import { NextApiRequest, NextApiResponse } from 'next'
import { dbConnect } from '../utils'
import { UserController } from '../controllers/user.contollers'
import NextCors from 'nextjs-cors'

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
    try {
      const response:any = await UserController.userChangepassword(req, res)
      console.log(response)
      if (response.status === 400) throw Error(response.message)
      if (response.status === 200) {
        res.status(200).json({ message: response.message, status: response.status })
      }
    } catch (error) {
      const result = (error as DOMException).message
      return res.status(500).json({ message: result, status: 500 })
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
      const response:any = await UserController.userChangepassword(req, res)
      console.log(response)
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
