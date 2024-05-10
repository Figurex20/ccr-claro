import { IncomesController } from '@/slices/incomes/incomesSlices'
import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { selectDateSearch } from '@/slices/incomes/dataSearch'
import { selectLogSiteSlices } from '@/slices/logsite/logSiteSlices'
import { Logsites } from '@/interface/interfaces'

export default function Logsite () {
  const dateSearch = useSelector(selectDateSearch)
  const listLogsite = useSelector(selectLogSiteSlices)
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
        <thead>
          <tr className=''>
            <th className='border border-primary bg-danger text-light align-middle'>Indidecia/Falla</th>
            <th className='border border-primary bg-danger text-light align-middle'>Sitio</th>
            <th className='border border-primary bg-danger text-light align-middle'>Zona</th>
            <th className='border border-primary bg-danger text-light align-middle'>Provincia</th>
            <th className='border border-primary bg-danger text-light align-middle'>Canton</th>
            <th className='border border-primary bg-danger text-light align-middle'>Distrito</th>
            <th className='border border-primary bg-danger text-light align-middle'>Afecta</th>
            <th className='border border-primary bg-danger text-light align-middle'>Seguimiento</th>
            <th className='border border-primary bg-danger text-light align-middle'>Tiempo acumulado</th>
            <th className='border border-primary bg-danger text-light align-middle'>Actualizar</th>
          </tr>
        </thead>

        <tbody>
          {listLogsite?.saveLogsite.docs.map((site: Logsites) => (
            <tr key={site._id} className='text-center fs-6 align-middle'>
              <td className='border border-success'>{site.Incidencia_Falla}</td>
              <td className='border border-success'>{site.site}</td>
              <td className='border border-success'>{site.zone}</td>
              <td className='border border-success'>{site.province}</td>
              <td className='border border-success'>{site.canton}</td>
              <td className='border border-success'>{site.distrito}</td>
              <td className='border border-success'>{site.affect}</td>
              <td className='border border-success'>
                {site.tracking.map((tracking) => (
                  <div key={tracking.dateEnter} className='border border-success align-middle'>
                    <p>{tracking.dateEnter}</p>
                    <p>{tracking.coment}</p>
                  </div>
                ))}
              </td>
              <td className='border border-success'>{site.createdAt}</td>
              <td className='border border-success'>Actualizar</td>
            </tr>
          ))}
        </tbody>

      </Table>
    </div>
  )
}
