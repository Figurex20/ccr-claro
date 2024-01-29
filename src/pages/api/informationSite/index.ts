import { NextApiRequest, NextApiResponse } from 'next'
import { dbConnect } from '../utils'
import NextCors from 'nextjs-cors'
import { InformationSiteController } from '../controllers/informationSite.controllers'
import { valitadeCookies } from '../utils/valitadedToken'
import { UserModel } from '../models/modelUser'
import { RoleModel } from '../models/modelRole'

export default async function Method (req: NextApiRequest, res:NextApiResponse) {
  const { method } = req
  await dbConnect()
  const dataToken: any = await valitadeCookies(req.cookies)

  if (dataToken.message) throw Error(dataToken.message)

  const uniqueUser = await UserModel.findById(dataToken.token._id)

  if (!uniqueUser) throw Error(dataToken.message)

  const roles = await RoleModel.find({ _id: { $in: uniqueUser.roles } })
  if (roles[0].name === 'admin' || roles[0].name === 'moderator') {
    if (method === 'POST') {
      console.log('method: ', method)
      await post(req, res)
      return
    }
    if (method === 'PUT') {
      await put(req, res)
      return
    }
    if (method === 'GET') {
      await get(req, res)
    }
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
    const response = await InformationSiteController.createSite(req, res)
    console.log('response: ', response)
    if (response.status !== 200) throw Error(response.message)
    if (response.status === 200) {
      res.status(200).json(response)
    }
  } catch (error) {
    const result = (error as DOMException).message
    res.status(500).json({ status: 500, message: result })
  }
}

const put = async (req: NextApiRequest, res: NextApiResponse) => {
  const methods = ['PUT']
  await NextCors(req, res, {
    methods,
    origin: '*',
    optionsSuccessStatus: 200
  })
  try {
    const response = await InformationSiteController.updateSite(req, res)
    if (response.status !== 200) throw Error(response.message)

    if (response.status === 200) {
      res.status(200).json(response)
    }
  } catch (error) {
    const result = (error as DOMException).message
    res.status(500).json({ status: 500, message: result })
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
    const response = await InformationSiteController.getsite(req, res)
    if (response.status !== 200) throw Error(response.message)
    if (response.status === 200) {
      res.status(200).json(response)
    }
  } catch (error) {
    const result = (error as DOMException).message
    console.log('result: ', result)
    res.status(500).json({ status: 500, message: result })
  }
}
