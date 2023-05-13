import { OpecionsPaginateIncome } from '@/interface/interfaces'
import { IncomeModel } from '../models/modelIncome'
import type { NextApiRequest, NextApiResponse } from 'next'
export class IncomeController {
  static getIncomes = async (req: NextApiRequest, res: NextApiResponse) => {
    const numberPage = req.query.numberPage

    const options:OpecionsPaginateIncome = {
      sort: { dateEnter: -1 },
      page: Number(numberPage)
    }
    if (req.query.onlyEnd) {
      const onlyEnd = req.query.onlyEnd
      if (onlyEnd === 'true') {
        try {
          const incomes = await IncomeModel.paginate({
            exit: false
          }, options)
          if (incomes.docs.length === 0) throw Error('Someting went wrong with finde by onlyEnd  ')
          return res.status(200).json(incomes)
        } catch (error) {
          const result = (error as DOMException).message
          return res.status(404).json({ message: result })
        }
      } else {
        return res.status(400).json({ message: 'the onlyEnd must be true' })
      }
    }

    // find by onlyEnter
    if (req.query.onlyEnter) {
      const onlyEnter = req.query.onlyEnter
      //   const site = req.query.site

      if (onlyEnter === 'true') {
        try {
          const incomes = await IncomeModel.paginate({
            exit: 'false'
          }, options)
          if (incomes.docs.length === 0) throw Error('Someting went wrong with onlyEnter')
          return res.status(200).json(incomes)
        } catch (error) {
          const result = (error as DOMException).message
          return res.status(404).json({ message: result })
        }
      } else {
        return res.status(400).json({ message: 'the onlyEnter must be true' })
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

        console.log(isoStartDate)
        console.log(isoEndDate)

        const incomes = await IncomeModel.paginate({
          $and: [{ dateEnter: { $gte: isoStartDate } },
            { dateEnter: { $lte: isoEndDate } }]
        })
        if (incomes.docs.length === 0) throw Error('Someting went wrong with find by date')

        return res.status(200).json(incomes)
      } catch (error) {
        console.log(error)
        const result = (error as DOMException).message
        return res.status(404).json({ message: result })
      }
    }

    // find by site
    if (req.query.site) {
      try {
        const incomes = await IncomeModel.paginate({ rda: req.query.site }, options)
        if (incomes.docs.length === 0) throw Error('The SITE does not exist')
        return res.status(200).json(incomes)
      } catch (error) {
        const result = (error as DOMException).message
        return res.status(404).json({ message: result })
      }
    }

    // find by RDA
    if (req.query.rda) {
      try {
        const incomes = await IncomeModel.paginate({ rda: req.query.rda }, options)
        if (incomes.docs.length === 0) throw Error('The RDA does not exist')
        return res.status(200).json(incomes)
      } catch (error) {
        const result = (error as DOMException).message
        return res.status(404).json({ message: result })
      }
    }

    // normal find
    try {
      const incomes = await IncomeModel.paginate({}, options)
      if (incomes.docs.length === 0) throw Error('There are no docs')
      return incomes
    } catch (error) {
      const result = (error as DOMException).message
      return result
    }
  }

  static createIncome = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { name, site, whatdo, rda, exit, nameEnter, nameExit, dateEnter, comments } = req.body

      if (rda.length !== 7) {
        return res.status(400).json({ message: 'RDA invalida, tiene que ser de 7 numeros' })
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
      return res.status(201).json({ status: 'Income saved' })
    } catch (error) {
    //   const result = (error as DOMException).message
      return res.status(404).json({ message: 'somting wrong in createIcome' })
    }
  }

  static getIncome = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const incomes = await IncomeModel.findById(req.query.id)
      if (!incomes) throw Error('There are no docs')
      res.status(200).json(incomes)
    } catch (error) {
      const result = (error as DOMException).message
      return res.status(404).json({ message: result })
    }
  }

  static deleteIncome = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await IncomeModel.findByIdAndDelete(req.query.id)
      res.status(200).json({ status: 'Income deleted' })
    } catch (error) {
      const result = (error as DOMException).message
      return res.status(404).json({ message: result })
    }
  }

  static updateIncome = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await IncomeModel.findByIdAndUpdate(req.query.id, req.body, { new: true })
      res.status(201).json({ status: 'Income updated' })
    } catch (error) {
      const result = (error as DOMException).message
      return res.status(404).json({ message: result })
    }
  }
}
