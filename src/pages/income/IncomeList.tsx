import { incomesController, selectValueIncomes } from '@/slices/incomes/incomesSlices'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { hasCookie } from 'cookies-next'

interface Income {
        '_id': string,
        'name': string,
        'site': string,
        'whatdo': string,
        'rda': string,
        'exit': boolean,
        'nameEnter': string,
        'nameExit'?: string,
        'dateEnter': string,
        'dateExit'?: string,
        'comments': string,
        'createdAt': string,
        'updatedAt': string,
        '__v': 0
}
export const IncomeList = () => {
  const listincomes = useSelector(selectValueIncomes)
  const dispatch = useDispatch()

  useEffect(() => { incomesController.fetchAllIncomes(dispatch, 1) }, [dispatch])

  const dates = (date: string | undefined) => {
    if (date) {
      const newDate = new Date(date)

      const day = (
        <>
          <p>
            {newDate.toLocaleDateString('es-ES')} {newDate.getHours()}:{newDate.getMinutes()}
          </p>
        </>
      )
      return day
    }
  }

  return (
    <>
      <Table
        className='text-center border border-primary overflow-auto'
        style={{ fontSize: '1rem', fontWeight: 'bold' }}
      >
        <thead>
          <tr>
            <th className='border border-primary'>Tec</th>
            <th className='border border-primary'>Sitio</th>
            <th className='border border-primary'>Trabajo a realizar</th>
            <th className='border border-primary'>RDA</th>
            <th className='border border-primary'>Entrada</th>
            <th className='border border-primary'>Salida</th>
            <th className='border border-primary'>Nom-Ingreso</th>
            <th className='border border-primary'>Nom-Salida</th>
            <th className='border border-primary'>Coment</th>
            <th className='border border-primary'>Actualizar</th>
          </tr>
        </thead>
        <tbody>
          {listincomes.saveIncomes.docs && listincomes.saveIncomes.docs.map((income: Income) => (
            <tr key={income._id} className='text-center fs-6'>
              <th className='border border-success'>{income.name}</th>
              <th className='border border-success'>{income.site}</th>
              <th className='border border-success'>{income.whatdo}</th>
              <th className='border border-success'>{income.rda}</th>
              <th className='border border-success'>{dates(income.dateEnter)}</th>
              <th className='border border-success'>
                {income.exit
                  ? (
                      dates(income.dateExit)
                    )
                  : (
                    <p className='text-danger '>No ha salido</p>
                    )}
              </th>
              <th className='border border-success'>{income.nameEnter}</th>
              <th className='border border-success'>{income.nameExit}</th>
              <th className='border border-success'>{income.comments}</th>
              {hasCookie('userLogin')
                ? (
                  <>

                    <th className='border border-success'>
                      <Link className='btn btn-primary m-1' href={`/income/${income._id}`}>
                        Actualizar
                      </Link>
                    </th>
                  </>
                  )
                : (
                  <>
                    <th className='border border-success'>No tienes permiso</th>
                  </>
                  )}
            </tr>))}
        </tbody>
      </Table>
    </>
  )
}
