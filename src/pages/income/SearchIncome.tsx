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
  const [dateStart, setDateStart] = useState(null)
  const [dateEnd, setDateEnd] = useState(null)

  const {
    register,
    handleSubmit
    // formState: { errors }
  } = useForm({ mode: 'onChange' })

  const onSubmit = async (data: any) => {
    data.dateStart = dateStart
    data.dateEnd = dateEnd
    if (dateStart !== undefined && data.searchIncome.length > 0) {
      console.log('dateStart: ', dateStart)
      data.searchIncome = ''
      Swal.fire({
        icon: 'warning',
        title: 'Se trato de hacer una consulta del sitio y la fecha',
        text: 'Se dio priridad a la fecha, revise si hay datos en el buscador'
      })
    }
    DataReduxController.saveDateSearch(dispatch, data)
    if (data.exit === true && data.enter === true) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Solo se puede selecionar salida o entrada'
      })

      return
    }
    IncomesController.fetchAllIncomes(dispatch, 1, data)
  }

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)} className='d-flex justify-content-center'>
        <Form.Control
          className='w-25 me-2 border border-3 fs-7 h-25 d-inline-block'
          type='text'
          id='searchIncome'
          aria-describedby='searchIncome'
          placeholder='Sitio o RDA'
          {...register('searchIncome')}
        />
        <Form.Check
          className='me-5 fs-5  text-center text-light'
          style={{ width: '8rem' }}
          type='switch'
          id='custom-switch'
          label='Salida '
          {...register('exit')}
        />
        <Form.Check
          className='me-5 fs-5 text-center text-light'
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
