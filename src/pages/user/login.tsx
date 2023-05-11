/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import Form from 'react-bootstrap/Form'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Badge, Button } from 'react-bootstrap'
import { Login } from '@/interface/interfaces'
import { userController } from '@/slices/user/userSlices'
// import { Calendar } from '@/generalComponents/Calendar'

export default function edit () {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Login>()
  const onSubmit: SubmitHandler<Login> = async data => {
    userController.login(data).then(() => { reset() })
  }

  return (
    <div className='col-md-6 offset-md-3'>
      <div className='card card-body'>
        <h2 className='text-center'>User</h2>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className='mb-3' controlId='name'>
            <Form.Label>Name</Form.Label>
            {errors.userName && <Badge className='ms-1 bg-danger'>Este campo es requerido</Badge>}
            <Form.Control
              type='text'
              placeholder='Name'
              {...register('userName', { required: true })}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='name'>
            <Form.Label>Name</Form.Label>
            {errors.password && <Badge className='ms-1 bg-danger'>Este campo es requerido</Badge>}
            <Form.Control
              type='text'
              placeholder='Name'
              {...register('password', { required: true })}
            />
          </Form.Group>

          <Button variant='primary' type='submit'>
            Save
          </Button>

        </Form>

      </div>
    </div>
  )
}
