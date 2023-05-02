import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, selectValueCount } from '../slices/conunterSlices'
import Button from 'react-bootstrap/Button'
import { incomesController } from '@/slices/incomes/incomesSlices'

const inter = Inter({ subsets: ['latin'] })

export default function Home () {
  const count = useSelector(selectValueCount)
  const dispatch = useDispatch()

  incomesController.fetchAllIncomes(dispatch)

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <h1>The value of count is {count}</h1>

        <Button variant='primary' onClick={() => dispatch(increment())}>Increment</Button>
        <Button variant='secondary' onClick={() => dispatch(decrement())}>Decrement</Button>
      </main>
    </>
  )
}
