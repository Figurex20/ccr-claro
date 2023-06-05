import React from 'react'
import Form from 'react-bootstrap/Form'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Badge, Button } from 'react-bootstrap'
import { ChangePassword, BrowserToken } from '@/interface/interfaces'
import { userController } from '@/slices/user/userSlices'
import { useRouter } from 'next/router'
import styles from '@/styles/Home.module.css'
import Swal from 'sweetalert2'
import { decodeToken } from '@/decodeToken'

export default function Changepassword () {
  const token: BrowserToken | null = decodeToken()
  const router = useRouter()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ChangePassword>()

  const onSubmit: SubmitHandler<ChangePassword> = async data => {
    const userName = token!.userName

    if (data.confirmNewPassword === data.newPassword) {
      const option = 'changePassword'
      userController.updateUser(data, userName, option)
        .then(() => {
          router.replace('/')
          reset()
        })
      return
    }

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Las contraseñas no son iguales'
    })
  }
  // className={`${styles.main} `}
  return (
    <div className={`${styles.user}`}>
      <div className='border-top border-danger border-3 bg-secondary p-4 '>
        <h2 className='text-center'>Cambiar contraseña</h2>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className='mb-3' controlId='oldPassword'>
            <Form.Label>Contraseña vieja</Form.Label>
            {errors.oldPassword && <Badge className='ms-1 bg-danger'>Este campo es requerido</Badge>}
            <Form.Control
              type='text'
              placeholder='Contraseña vieja'
              {...register('oldPassword', { required: true })}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='newPassword'>
            <Form.Label>Nueva contraseña</Form.Label>
            {errors.newPassword && <Badge className='ms-1 bg-danger'>Este campo es requerido</Badge>}
            <Form.Control
              type='text'
              placeholder='Nueva contraseña'
              {...register('newPassword', { required: true })}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='confirmNewPassword'>
            <Form.Label>Confirmar nueva contraseña</Form.Label>
            {errors.confirmNewPassword && <Badge className='ms-1 bg-danger'>Este campo es requerido</Badge>}
            <Form.Control
              type='text'
              placeholder='Confirmar nueva contraseña'
              {...register('confirmNewPassword', { required: true })}
            />
          </Form.Group>

          <Button className='w-100 ' variant='danger' type='submit'>
            Guardar nueva contraseña
          </Button>

        </Form>

      </div>
    </div>
  )
}
