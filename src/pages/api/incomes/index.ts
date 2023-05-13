import { NextApiRequest, NextApiResponse } from 'next'
import { IncomeController } from '../controllers/income.controllers'
import { dbConnect } from '../utils'

export default async function GET (req: NextApiRequest, res:NextApiResponse) {
  await dbConnect()
  IncomeController.getIncomes(req, res)
}
