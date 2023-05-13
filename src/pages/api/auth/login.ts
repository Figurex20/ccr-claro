import { NextApiRequest, NextApiResponse } from 'next'
import { dbConnect } from '../utils'
import { AuthController } from '../controllers/auth.controllers'

export default async function GET (req: NextApiRequest, res:NextApiResponse) {
  await dbConnect()
  AuthController.signNin(req, res)
}
