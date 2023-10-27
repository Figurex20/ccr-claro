import { NextApiRequest, NextApiResponse } from 'next'
import { IncomeController } from '../controllers/income.controllers'
import { dbConnect } from '../utils'
import NextCors from 'nextjs-cors'
import { respondeIncomes } from '@/interface/interfaces'
import { valitadeCookies } from '../utils/valitadedToken'
import { UserModel } from '../models/modelUser'
import { RoleModel } from '../models/modelRole'

export default async function GET (req: NextApiRequest, res:NextApiResponse) {
  const { method } = req
  await dbConnect()

  if (method === 'GET') {
    await get(req, res)
    return
  }

  const dataToken: any = await valitadeCookies(req.cookies)

  if (dataToken.message) throw Error(dataToken.message)

  const uniqueUser = await UserModel.findById(dataToken.token._id)

  if (!uniqueUser) throw Error(dataToken.message)

  const roles = await RoleModel.find({ _id: { $in: uniqueUser.roles } })
  if (roles[0].name === 'admin' || roles[0].name === 'moderator') {
    if (method === 'POST') {
      await post(req, res)
    }
  }
}

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const methods = ['GET']
  await NextCors(req, res, {
    methods,
    origin: '*',
    optionsSuccessStatus: 200
  })
  try {
    const response:respondeIncomes = await IncomeController.getIncomes(req, res)
    if (response.status !== 200) throw Error(response.message)
    if (response.status === 200) {
      res.status(200).json(response.incomes)
    }
  } catch (error) {
    const result = (error as DOMException).message
    res.status(500).json({ status: 500, message: result })
  }
}

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const methods = ['POST']
  await NextCors(req, res, {
    methods,
    origin: '*',
    optionsSuccessStatus: 200
  })
  try {
    const response = await IncomeController.createIncome(req, res)
    if (response.status !== 200) throw Error(response.message)

    if (response.status === 200) {
      res.status(200).json(response)
    }
  } catch (error) {
    const result = (error as DOMException).message
    res.status(500).json({ status: 500, message: result })
  }
}
