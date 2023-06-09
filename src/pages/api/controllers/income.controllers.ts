import { OpecionsPaginateIncome } from '@/interface/interfaces'
import { IncomeModel } from '../models/modelIncome'
import type { NextApiRequest, NextApiResponse } from 'next'
import { valitadeCookies } from '../utils/valitadedToken'
export class IncomeController {
  static getIncomes = async (req: NextApiRequest, res: NextApiResponse) => {
    const numberPage = req.query.numberPage

    const options:OpecionsPaginateIncome = {
      sort: { dateEnter: -1 },
      page: Number(numberPage),
      limit: 80
    }

    if (req.query.onlyEnd) {
      const onlyEnd = req.query.onlyEnd
      if (onlyEnd === 'true') {
        try {
          const incomes = await IncomeModel.paginate({
            exit: true
          }, options)
          if (incomes.docs.length === 0) throw Error('There are no docs')
          return { incomes, status: 200 }
        } catch (error) {
          const result = (error as DOMException).message
          return { message: result, status: 400 }
        }
      } else {
        return { message: 'the onlyEnd must be true', status: 400 }
      }
    }

    // find by onlyEnter
    if (req.query.onlyEnter) {
      const onlyEnter = req.query.onlyEnter
      if (onlyEnter === 'true') {
        try {
          const incomes = await IncomeModel.paginate({
            exit: 'false'
          }, options)
          if (incomes.docs.length === 0) throw Error('Someting went wrong with onlyEnter')
          return { incomes, status: 200 }
        } catch (error) {
          const result = (error as DOMException).message
          return { message: result, status: 400 }
        }
      } else {
        return { message: 'the onlyEnd must be true', status: 400 }
      }
    }

    // find by date
    if (req.query.startDate && req.query.endDate) {
      try {
        const startDate = req.query.startDate.toString()
        const endDate = req.query.endDate.toString()

        const neWstartDate = new Date(startDate)
        const neWendDate = new Date(endDate)

        const isoStartDate = neWstartDate.toISOString()
        const isoEndDate = neWendDate.toISOString()

        const incomes = await IncomeModel.paginate({
          $and: [{ dateEnter: { $gte: isoStartDate } },
            { dateEnter: { $lte: isoEndDate } }]
        })
        if (incomes.docs.length === 0) throw Error('Someting went wrong with find by date')

        return { incomes, status: 200 }
      } catch (error) {
        const result = (error as DOMException).message
        return { message: result, status: 400 }
      }
    }

    // find by site
    if (req.query.site) {
      try {
        const incomes = await IncomeModel.paginate({ site: req.query.site }, options)
        if (incomes.docs.length === 0) throw Error('The SITE does not exist')
        return { incomes, status: 200 }
      } catch (error) {
        const result = (error as DOMException).message
        return { message: result, status: 400 }
      }
    }

    // find by RDA
    if (req.query.rda) {
      try {
        const incomes = await IncomeModel.paginate({ rda: req.query.rda }, options)
        if (incomes.docs.length === 0) throw Error('The RDA does not exist')
        return { incomes, status: 200 }
      } catch (error) {
        const result = (error as DOMException).message
        return { message: result, status: 400 }
      }
    }

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
        return { message: 'RDA invalida, tiene que ser de 7 numeros' }
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

      const incomes = await IncomeModel.findById(req.query.id)
      if (!incomes) throw Error('There are no docs')
      return incomes
    } catch (error) {
      const result = (error as DOMException).message
      return { message: result, status: 400 }
    }
  }

  static updateIncome = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const dataToken: any = await valitadeCookies(req.cookies)

      if (dataToken.message) throw Error(dataToken.message)

      const nameExit = dataToken.token!.userName.toUpperCase()

      req.body.nameExit = nameExit

      await IncomeModel.findByIdAndUpdate(req.query.id, req.body, { new: true })
      return { message: 'Income updated', status: 200 }
    } catch (error) {
      const result = (error as DOMException).message
      return { message: result, status: 400 }
    }
  }
}
