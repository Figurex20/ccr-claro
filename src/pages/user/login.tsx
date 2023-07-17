/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Badge, Button } from 'react-bootstrap'
import { Login } from '@/interface/interfaces'
import { userController } from '@/slices/user/userSlices'
// import { Calendar } from '@/generalComponents/Calendar'
import { useRouter } from 'next/router'
import styles from '@/styles/Home.module.css'

export default function edit () {
  const [seePassword, setSeePassword] = useState < boolean >(true)

  const handleSeePassword = () => {
    setSeePassword(!seePassword)
  }

  const router = useRouter()
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Login>()

  const onSubmit: SubmitHandler<Login> = async data => {
    userController.login(data)
      .then(() => {
        router.replace('/')
        reset()
      }).catch(() => {
        console.log('error en el login')
      })
  }
  // className={`${styles.main} `}
  return (
    <div className={`${styles.user}`}>
      <div className='border-top border-info border-3 bg-secondary p-4 '>
        <h2 className='text-center'>Acceder a tu cuenta</h2>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className='mb-3' controlId='name'>
            <Form.Label>Nombre</Form.Label>
            {errors.userName && <Badge className='ms-1 bg-danger'>Este campo es requerido</Badge>}
            <Form.Control
              type='text'
              placeholder='Nombre'
              {...register('userName', { required: true })}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='name'>
            <Form.Label>Contreseña</Form.Label>
            {errors.password && <Badge className='ms-1 bg-danger'>Este campo es requerido</Badge>}
            <Form.Control
              type={seePassword ? 'password' : 'text'}
              placeholder='Contreseña'
              {...register('password', { required: true })}
            />
          </Form.Group>
          <div className='d-flex justify-content-between'>
            <Button variant='danger' onClick={() => { handleSeePassword() }}>
              {seePassword ? 'Ver contraseña' : 'Ocultar contraseña'}
            </Button>

            <Button className='w-25' variant='info' type='submit'>
              login
            </Button>
          </div>

        </Form>

      </div>
    </div>
  )
}
