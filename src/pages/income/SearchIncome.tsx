import Form from 'react-bootstrap/Form'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

// redux
import { useDispatch } from 'react-redux'
import { incomesController } from '../../slices/incomes/incomesSlices'

// Components
import Button from 'react-bootstrap/Button'

import { Calendar } from '../../generalComponents/Calendar'
import { dataReduxController } from '@/slices/incomes/dataSearch'

const SearchIncome = () => {
  const dispatch = useDispatch()
  const [dateStart, setDateStart] = useState(null)
  const [dateEnd, setDateEnd] = useState(null)

  const {
    register,
    handleSubmit
    // formState: { errors }
  } = useForm()

  const onSubmit = async (data: any) => {
    data.dateStart = dateStart
    data.dateEnd = dateEnd
    dataReduxController.saveDateSearch(dispatch, data)
    if (data.exit === true && data.enter === true) {
      return alert('Seleccione solo "Entrada" o "Salida"')
    }
    incomesController.fetchAllIncomes(dispatch, 1, data)
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

export { SearchIncome }
