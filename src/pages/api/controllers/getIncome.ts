import { NextApiRequest } from 'next'
import { IncomeModel } from '../models/modelIncome'
import { OpecionsPaginateIncome } from '@/interface/interfaces'

export const getOnlyEnter = async (req: NextApiRequest, options:OpecionsPaginateIncome) => {
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

export const getOnlyEnd = async (req: NextApiRequest, options:OpecionsPaginateIncome) => {
  const onlyEnter = req.query.onlyEnter
  if (onlyEnter === 'true') {
    try {
      const incomes = await IncomeModel.paginate({
        exit: false
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

export const getByDate = async (req: NextApiRequest, options:OpecionsPaginateIncome) => {
  try {
    const startDate = req.query.startDate ? req.query.startDate.toString() : new Date().toISOString()
    const endDate = req.query.endDate ? req.query.endDate.toString() : new Date().toISOString()

    const neWstartDate = new Date(startDate)
    const neWendDate = new Date(endDate)

    const isoStartDate = neWstartDate.toISOString()
    const isoEndDate = neWendDate.toISOString()

    const incomes = await IncomeModel.paginate({
      $and: [{ dateEnter: { $gte: isoStartDate } },
        { dateEnter: { $lte: isoEndDate } }]
    }, options)
    if (incomes.docs.length === 0) throw Error('Someting went wrong with find by date')

    return { incomes, status: 200 }
  } catch (error) {
    const result = (error as DOMException).message
    return { message: result, status: 400 }
  }
}

export const getBySite = async (req: NextApiRequest, options:OpecionsPaginateIncome) => {
  try {
    const incomes = await IncomeModel.paginate({ site: req.query.site }, options)
    if (incomes.docs.length === 0) throw Error('The SITE does not exist')
    return { incomes, status: 200 }
  } catch (error) {
    const result = (error as DOMException).message
    return { message: result, status: 400 }
  }
}

export const getByRDA = async (req: NextApiRequest, options:OpecionsPaginateIncome) => {
  try {
    const incomes = await IncomeModel.paginate({ rda: req.query.rda }, options)
    if (incomes.docs.length === 0) throw Error('The RDA does not exist')
    return { incomes, status: 200 }
  } catch (error) {
    const result = (error as DOMException).message
    return { message: result, status: 400 }
  }
}
