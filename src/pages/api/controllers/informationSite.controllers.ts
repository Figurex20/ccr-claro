import { InformationSiteModel } from '../models/modelInformationSite'
import { NextApiRequest, NextApiResponse } from 'next'
import { valitadeCookies } from '../utils/valitadedToken'
import { OpecionsPaginateIncome } from '@/interface/interfaces'
import { createSites, deleteInformationSites, updateSites } from './functionsInfoSites'
import { UserModel } from '../models/modelUser'
import { RoleModel } from '../models/modelRole'

export class InformationSiteController {
  static readonly createSite = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const dataToken: any = await valitadeCookies(req.cookies)

      if (dataToken.message) throw Error(dataToken.message)

      const uniqueUser = await UserModel.findById(dataToken.token._id)

      if (!uniqueUser) throw Error(dataToken.message)

      const roles = await RoleModel.find({ _id: { $in: uniqueUser.roles } })

      if (roles[0].name === 'admin' || roles[0].name === 'moderator') {
        await createSites(req)
      } else throw Error('you dont have permissions')

      return { message: 'Site saved', status: 200 }
    } catch (error) {
      const result = (error as DOMException).message || 'Error in create site'
      return { message: result, status: 400 }
    }
  }

  static readonly updateSite = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const dataToken: any = await valitadeCookies(req.cookies)

      if (dataToken.message) throw Error(dataToken.message)

      const uniqueUser = await UserModel.findById(dataToken.token._id)

      if (!uniqueUser) throw Error(dataToken.message)

      const roles = await RoleModel.find({ _id: { $in: uniqueUser.roles } })

      if (roles[0].name === 'admin' || roles[0].name === 'moderator') {
        console.log('object')
        await updateSites(req)
        return { message: 'Income updated', status: 200 }
      } else return { message: 'User not have perssions', status: 400 }
    } catch (error) {
      const result = (error as DOMException).message
      return { message: result, status: 400 }
    }
  }

  static readonly getsite = async (req: NextApiRequest, res: NextApiResponse) => {
    const numberPage = 1

    const options:OpecionsPaginateIncome = {
      sort: { dateEnter: -1 },
      page: Number(numberPage),
      limit: 80
    }

    try {
      if (req.query.id) {
        console.log('req.query.id: ', req.query.id)
        const site = await InformationSiteModel.paginate({ mnemonico: req.query.id }, options)
        if (site.docs.length === 0) throw Error('There are no docs')
        return { site, status: 200 }
      }

      const site = await InformationSiteModel.paginate({}, options)
      if (site.docs.length === 0) throw Error('There are no docs')
      return { site, status: 200 }
    } catch (error) {
      const result = (error as DOMException).message
      return { message: result, status: 400 }
    }
  }

  static readonly deleteSite = async (req: NextApiRequest) => {
    try {
      const dataToken: any = await valitadeCookies(req.cookies)

      if (dataToken.message) throw Error(dataToken.message)

      const uniqueUser = await UserModel.findById(dataToken.token._id)

      const roles = await RoleModel.find({ _id: { $in: uniqueUser!.roles } })

      if (roles[0].name === 'admin') {
        if (req.query.id && typeof req.query.id === 'string') {
          await deleteInformationSites(req.query.id)
        }
        return { message: 'User deleted', status: 200 }
      } else {
        return { message: 'User not have perssions', status: 400 }
      }
    } catch (error) {
      const result = (error as DOMException).message
      return { message: result, status: 400 }
    }
  }
}
