import { OpecionsPaginateIncome } from '@/interface/interfaces'
import { IncomeModel } from '../models/modelIncome'
import type { NextApiRequest, NextApiResponse } from 'next'
import { valitadeCookies } from '../utils/valitadedToken'
import { RoleModel } from '../models/modelRole'
import { UserModel } from '../models/modelUser'
import { getByDate, getByRDA, getBySite, getOnlyEnd, getOnlyEnter } from './getIncome'
export class IncomeController {
  static getIncomes = async (req: NextApiRequest, res: NextApiResponse) => {
    const numberPage = req.query.numberPage

    const options:OpecionsPaginateIncome = {
      sort: { dateEnter: -1 },
      page: Number(numberPage),
      limit: 80
    }

    // find by onlyEnd
    if (req.query.onlyEnd) { return getOnlyEnter(req, options) }

    // find by onlyEnter
    if (req.query.onlyEnter) { return getOnlyEnd(req, options) }

    // find by date
    if (req.query.startDate && req.query.endDate) { return getByDate(req, options) }

    // find by site
    if (req.query.site) { return getBySite(req, options) }

    // find by RDA
    if (req.query.rda) { return getByRDA(req, options) }

    // normal find
    try {
      const incomes = await IncomeModel.paginate({}, options)
      if (incomes.docs.length === 0) throw Error('There are no docs')
      return { incomes, status: 200 }
    } catch (error) {
      const result = (error as DOMException).message
      return { message: result, status: 400 }
    }
  }

  static createIncome = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const dataToken: any = await valitadeCookies(req.cookies)

      if (dataToken.message) throw Error(dataToken.message)

      const nameEnter = dataToken.token!.userName.toUpperCase()

      const { name, site, whatdo, rda, exit, nameExit, dateEnter, comments } = req.body

      if (rda.length !== 7) {
        return { message: 'RDA invalida, tiene que ser de 7 numeros', status: 400 }
      }

      const newIncome = new IncomeModel({
        name,
        site,
        whatdo,
        rda,
        exit,
        nameEnter,
        nameExit,
        dateEnter,
        comments
      })
      await newIncome.save()
      return { message: 'Income saved', status: 200 }
    } catch (error) {
      return { message: 'somting wrong in createIcome', status: 400 }
    }
  }

  static getIncome = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const dataToken: any = await valitadeCookies(req.cookies)

      if (dataToken.message) throw Error(dataToken.message)

      const incomes = await IncomeModel.paginate({ _id: req.query.id })

      return { incomes, status: 200 }
    } catch (error) {
      const result = (error as DOMException).message
      return { message: result, status: 400 }
    }
  }

  static updateIncome = async (req: NextApiRequest, res: NextApiResponse) => {
    const dataToken: any = await valitadeCookies(req.cookies)

    if (dataToken.message) throw Error(dataToken.message)

    const uniqueUser = await UserModel.findById(dataToken.token._id)

    if (!uniqueUser) throw Error(dataToken.message)

    const roles = await RoleModel.find({ _id: { $in: uniqueUser.roles } })

    if (roles[0].name === 'admin' || roles[0].name === 'moderator') {
      try {
        const incomes = await IncomeModel.paginate({ _id: req.query.id })

        if (incomes.docs.length === 0) throw Error('Error in update income')

        if (incomes.docs[0].exit) {
          delete req.body.exit
          delete req.body.nameExit
          delete req.body.dateExit
          await IncomeModel.findByIdAndUpdate(req.query.id, req.body, { new: true })
          return { message: 'Income updated', status: 200 }
        }

        if (req.body.exit) {
          const nameExit = dataToken.token!.userName.toUpperCase()
          req.body.nameExit = nameExit
          await IncomeModel.findByIdAndUpdate(req.query.id, req.body, { new: true })
          return { message: 'Income updated', status: 200 }
        }

        await IncomeModel.findByIdAndUpdate(req.query.id, req.body, { new: true })
        return { message: 'Income updated', status: 200 }
      } catch (error) {
        const result = (error as DOMException).message
        console.log('result: ', result)
        return { message: result, status: 400 }
      }
    }
  }
}
