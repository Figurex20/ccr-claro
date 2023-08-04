import Form from 'react-bootstrap/Form'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

// redux
import { useDispatch } from 'react-redux'
import { IncomesController } from '../../slices/incomes/incomesSlices'

// Components
import Button from 'react-bootstrap/Button'

import { Calendar } from '../../generalComponents/Calendar'
import { DataReduxController } from '@/slices/incomes/dataSearch'
import Swal from 'sweetalert2'

export default function SearchIncome () {
  const dispatch = useDispatch()
  const [dateStart, setDateStart] = useState(undefined)
  const [dateEnd, setDateEnd] = useState(undefined)

  const {
    register,
    handleSubmit
    // formState: { errors }
  } = useForm({ mode: 'onChange' })

  const onSubmit = async (data: any) => {
    data.dateStart = dateStart
    data.dateEnd = dateEnd

    if ((dateStart === undefined || dateStart === null) && (data.searchIncome.length === 0 && !data.enter && !data.exit)) {
      data = {}
      await DataReduxController.saveDateSearch(dispatch, data)
      await IncomesController.fetchAllIncomes(dispatch, 1)
      return
    }

    if ((dateStart === undefined || dateStart === null) && data.searchIncome.length >= 0) {
      DataReduxController.saveDateSearch(dispatch, data)
      if (data.exit === true && data.enter === true) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Solo se puede selecionar salida o entrada'
        })

        return
      }
      await IncomesController.fetchAllIncomes(dispatch, 1, data)

      return
    }

    Swal.fire({
      icon: 'warning',
      title: 'Se trato de hacer una consulta del sitio y la fecha',
      text: 'Elimine los filtros'
    })
    setDateStart(undefined)
    setDateEnd(undefined)
  }

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)} className='d-flex justify-content-center mt-2'>
        <Form.Control
          className='w-25 me-2 border border-3 fs-7 h-25 d-inline-block'
          type='text'
          id='searchIncome'
          aria-describedby='searchIncome'
          placeholder='Sitio o RDA'
          {...register('searchIncome')}
        />
        <Form.Check
          className='pt-2 me-5 fs-5  text-center text-light'
          style={{ width: '8rem' }}
          type='switch'
          id='custom-switch'
          label='Salida '
          {...register('exit')}
        />
        <Form.Check
          className='pt-2 me-5 fs-5 text-center text-light'
          type='switch'
          id='custom-switch'
          label='Entrada'
          {...register('enter')}
        />
        <div className='ms-2 '>
          <Calendar setDate={setDateStart} />
          <label className='text-light'>Fecha inicio</label>
        </div>
        <div className='ms-2'>
          <Calendar setDate={setDateEnd} />
          <label className='text-light'>Fecha final</label>
        </div>
        <Button variant='success' type='submit' className='ms-2 h-25 d-inline-block'>
          Buscar
        </Button>
      </Form>
    </div>
  )
}
