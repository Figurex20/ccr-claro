import { NextApiRequest, NextApiResponse } from 'next'
import { dbConnect } from '../utils'
import NextCors from 'nextjs-cors'
import { AuthController } from '../controllers/auth.controllers'
export default async function POST (req: NextApiRequest, res:NextApiResponse) {
  await dbConnect()

  const { method } = req

  if (method === 'POST') {
    const methods = ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE']
    await NextCors(req, res, {
      methods,
      origin: '*',
      optionsSuccessStatus: 200
    })
    const response = await AuthController.signNin(req, res)
    if (response.message === 'Incorrect username or password') {
      console.log(response.message)
      return res.status(401).json({ data: response.message })
    }
    res.setHeader('Set-Cookie', response.serealized!)
    return res.status(200).json({ user: response.user })
  }
}
