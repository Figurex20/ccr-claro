import { NextApiRequest, NextApiResponse } from 'next'
import { IncomeController } from '../controllers/income.controllers'
import { dbConnect } from '../utils'
import { valitadeCookies } from '../utils/valitadedToken'
import { UserModel } from '../models/modelUser'
import { RoleModel } from '../models/modelRole'
import { InformationSiteController } from '../controllers/informationSite.controllers'
import NextCors from 'nextjs-cors'

export default async function GET (req: NextApiRequest, res:NextApiResponse) {
  await dbConnect()
  const { method } = req

  const dataToken: any = await valitadeCookies(req.cookies)

  if (dataToken.message) throw Error(dataToken.message)

  const uniqueUser = await UserModel.findById(dataToken.token._id)

  if (!uniqueUser) throw Error(dataToken.message)

  const roles = await RoleModel.find({ _id: { $in: uniqueUser.roles } })
  if (roles[0].name === 'admin' || roles[0].name === 'moderator') {
    if (method === 'GET') {
      await get(req, res)
      return
    }

    if (method === 'DELETE') {
      await deleteSite(req, res)
    }
  }
}

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response:any = await IncomeController.getIncome(req, res)
    if (response.status !== 200) throw Error(response.message)
    return res.status(200).json(response)
  } catch (error) {
    const result = (error as DOMException).message
    return res.status(500).json({ status: 500, message: result })
  }
}

const deleteSite = async (req: NextApiRequest, res: NextApiResponse) => {
  const methods = ['PUT']
  await NextCors(req, res, {
    methods,
    origin: '*',
    optionsSuccessStatus: 200
  })
  try {
    const response = await InformationSiteController.deleteSite(req)
    if (response.status !== 200) throw Error(response.message)

    if (response.status === 200) {
      return res.status(200).json(response)
    }
  } catch (error) {
    const result = (error as DOMException).message
    return res.status(500).json({ status: 500, message: result })
  }
}
