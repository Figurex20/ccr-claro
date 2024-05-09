import { IncomesController } from '@/slices/incomes/incomesSlices'
import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { selectDateSearch } from '@/slices/incomes/dataSearch'

export default function Logsite () {
  const dateSearch = useSelector(selectDateSearch)
  const dispatch = useDispatch()

  useEffect(() => {
    const reset = async () => {
      const isEmpty = JSON.stringify(dateSearch) === '{}'

      if (isEmpty) {
        IncomesController.fetchAllIncomes(dispatch, 1)
      }
    }

    setInterval(reset, 180000)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateSearch])

  useEffect(() => {
    IncomesController.fetchAllIncomes(dispatch, 1)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='m-5'>
      <Table
        className='text-center border border-primary mb-5'
        style={{ fontSize: '1rem', fontWeight: 'bold' }}
      >
        <thead className=''>
          <tr className=''>
            <th className='border border-primary bg-danger text-light '>Indidecia/Falla</th>
            <th className='border border-primary bg-danger text-light '>Sitio</th>
            <th className='border border-primary bg-danger text-light '>Lugar</th>
            <th className='border border-primary bg-danger text-light '>Lugar</th>
            <th className='border border-primary bg-danger text-light '>Lugar</th>
            <th className='border border-primary bg-danger text-light '>Afecta</th>
            <th className='border border-primary bg-danger text-light '>Seguimiento</th>
            <th className='border border-primary bg-danger text-light '>Tiempo acumulado</th>
            <th className='border border-primary bg-danger text-light '>Actualizar</th>
          </tr>

        </thead>

      </Table>
    </div>
  )
}
