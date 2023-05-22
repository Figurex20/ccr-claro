import { NextApiRequest, NextApiResponse } from 'next'
import { IncomeController } from '../controllers/income.controllers'
import { dbConnect } from '../utils'

export default async function GET (req: NextApiRequest, res:NextApiResponse) {
  await dbConnect()
  const { method } = req

  if (method === 'GET') {
    try {
      const response:any = await IncomeController.getIncome(req, res)
      if (response.message !== 'No tienes autorizacion') {
        res.status(200).json(response)
      } else { throw Error('No tienes autorizacion') }
    } catch (error) {
      const result = (error as DOMException).message
      res.status(500).json({ status: 'Internal server error', message: result })
    }
  }

  if (method === 'PUT') {
    try {
      const response:any = await IncomeController.updateIncome(req, res)
      if (response) {
        res.status(200).json(response)
      }
    } catch (error) {
      const result = (error as DOMException).message
      res.status(500).json({ status: 'Internal server error', message: result })
    }
  }
}
