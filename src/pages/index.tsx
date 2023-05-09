import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
// import { useSelector, useDispatch } from 'react-redux'
// import { decrement, increment, selectValueCount } from '../slices/conunterSlices'
// import Button from 'react-bootstrap/Button'
import { IncomeList } from '@/incomes/IncomeList'
// import { incomesController } from '@/slices/incomes/incomesSlices'

const inter = Inter({ subsets: ['latin'] })

export default function Home () {
  // const count = useSelector(selectValueCount)
  // const dispatch = useDispatch()

  // incomesController.fetchAllIncomes(dispatch)

  return (
    <>
      <main className={`${styles.main} ${inter.className}`}>
        <IncomeList />
      </main>
    </>
  )
}
