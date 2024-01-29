import { InformationSiteModel } from '../models/modelInformationSite'
import { NextApiRequest, NextApiResponse } from 'next'
import { valitadeCookies } from '../utils/valitadedToken'
import { OpecionsPaginateIncome } from '@/interface/interfaces'
import { createSites } from './createSites'

export class InformationSiteController {
  static createSite = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const dataToken: any = await valitadeCookies(req.cookies)

      if (dataToken.message) throw Error(dataToken.message)

      await createSites(req)

      return { message: 'Site saved', status: 200 }
    } catch (error) {
      const result = (error as DOMException).message || 'Error in create site'
      return { message: result, status: 400 }
    }
  }

  static updateSite = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      {
        const site = await InformationSiteModel.paginate({ _id: req.query.id })

        if (site.docs.length === 0) throw Error('Error in update site')

        await InformationSiteModel.findByIdAndUpdate(req.query.id, req.body, { new: true })
      }
      return { message: 'Income updated', status: 200 }
    } catch (error) {
      const result = (error as DOMException).message
      return { message: result, status: 400 }
    }
  }

  static getsite = async (req: NextApiRequest, res: NextApiResponse) => {
    const numberPage = req.query.numberPage

    const options:OpecionsPaginateIncome = {
      sort: { dateEnter: -1 },
      page: Number(numberPage),
      limit: 80
    }

    try {
      const site = await InformationSiteModel.paginate({}, options)
      if (site.docs.length === 0) throw Error('There are no docs')
      return { site, status: 200 }
    } catch (error) {
      const result = (error as DOMException).message
      return { message: result, status: 400 }
    }
  }
}
