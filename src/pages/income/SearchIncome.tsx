import Form from 'react-bootstrap/Form'
import { useForm } from 'react-hook-form'
// import { useState } from 'react'

// redux
import { useDispatch } from 'react-redux'
import { IncomesController } from '../../slices/incomes/incomesSlices'

// Components
import Button from 'react-bootstrap/Button'

// import { Calendar } from '../../generalComponents/Calendar'
import { DataReduxController } from '@/slices/incomes/dataSearch'
import Swal from 'sweetalert2'

export default function SearchIncome () {
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit
    // formState: { errors }
  } = useForm({ mode: 'onChange' })

  const onSubmit = async (data: any) => {
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
        <Button variant='success' type='submit' className='ms-2 h-25 d-inline-block'>
          Buscar
        </Button>
      </Form>
    </div>
  )
}
