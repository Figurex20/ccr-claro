/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import Form from 'react-bootstrap/Form'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Badge, Button } from 'react-bootstrap'
import { Login } from '@/interface/interfaces'
import { userController } from '@/slices/user/userSlices'
// import { Calendar } from '@/generalComponents/Calendar'
import { useRouter } from 'next/router'
import styles from '@/styles/Home.module.css'

export default function edit () {
  const router = useRouter()
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Login>()

  const onSubmit: SubmitHandler<Login> = async data => {
    userController.login(data)
      .then(() => {
        router.replace('/')
        reset()
      })
  }
  // className={`${styles.main} `}
  return (
    <div className={`${styles.user}`}>
      <div className='border-top border-info border-3 bg-secondary p-4 '>
        <h2 className='text-center'>Acceder a tu cuenta</h2>

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

          <Button className='w-100 ' variant='info' type='submit'>
            login
          </Button>

        </Form>

      </div>
    </div>
  )
}
