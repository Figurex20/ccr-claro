import { NextApiRequest, NextApiResponse } from 'next'
import { IncomeController } from '../controllers/income.controllers'
import { dbConnect } from '../utils'
import NextCors from 'nextjs-cors'
import { respondeIncomes } from '@/interface/interfaces'

export default async function GET (req: NextApiRequest, res:NextApiResponse) {
  const { method } = req
  await dbConnect()
  if (method === 'GET') {
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

  if (method === 'POST') {
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
}
