import Form from 'react-bootstrap/Form'
import { useForm } from 'react-hook-form'
// import { useState } from 'react'

// redux
import { useDispatch } from 'react-redux'
import { informationSiteController } from '@/slices/informationSites/informationSiteSlices'

// Components
import Button from 'react-bootstrap/Button'

import { DataReduxController } from '@/slices/incomes/dataSearch'

export default function SearchInfoSite () {
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit
    // formState: { errors }
  } = useForm({ mode: 'onChange' })

  const onSubmit = async (data: any) => {
    DataReduxController.saveDateSearch(dispatch, data)

    await informationSiteController.getInformationSite(dispatch, data)
  }

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)} className='d-flex justify-content-center mt-2'>
        <Form.Control
          className='w-25 me-2 border border-3 fs-7 h-25 d-inline-block'
          type='text'
          id='searchIncome'
          aria-describedby='searchIncome'
          placeholder='mnemonico'
          {...register('searchIncome')}
        />

        <Button variant='success' type='submit' className='ms-2 h-25 d-inline-block'>
          Buscar
        </Button>
      </Form>
    </div>
  )
}
