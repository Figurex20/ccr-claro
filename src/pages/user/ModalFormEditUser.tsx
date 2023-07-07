import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import Form from 'react-bootstrap/Form'
import { SubmitHandler, useForm } from 'react-hook-form'
import { userController } from '@/slices/user/userSlices'
import { SubmitUserData, User } from '@/interface/interfaces'

const ModalFormEditUser = (props: User) => {
  const user = props
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => {
    setShow(true)
    getDateUser()
  }

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<SubmitUserData>()

  const getDateUser = () => {
    setValue('name', user.name)
    setValue('lastname', user.lastname)
    setValue('role', user.role)
    setValue('email', user.email)
    setValue('userName', user.userName)
    setValue('password', user.password)
  }

  const onSubmit: SubmitHandler<SubmitUserData> = async (data) => {
    try {
      data._id = user._id
      const success = await userController.updateUser(data, user.userName)
      if (success) {
        reset()
        return
      }
    } catch (error) {
      console.log(error)
    }
  }

  const resetPassword = async () => {
    try {
      const id = user._id
      const option = 'resetPassword'
      const success = await userController.updateUser(id, user.userName, option)
      if (success) {
        reset()
        return
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Button variant='info ' size='lg' onClick={handleShow}>
        Editar Usuario
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className='mb-3' controlId='name'>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                {...register('name', { required: true })}
                type='text'
                placeholder='Enter name'
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='lastname'>
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                {...register('lastname', { required: true })}
                type='text'
                placeholder='Enter last name'
              />
              {errors.password && <h5>password is required</h5>}
            </Form.Group>
            <Form.Group className='mb-3' controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                {...register('email', { required: true })}
                type='text'
                placeholder='Enter email'
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='userName'>
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                {...register('userName', { required: true })}
                type='text'
                placeholder='Enter username'
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='role'>
              <Form.Label>Role</Form.Label>
              <Form.Select
                aria-label='Default select example'
                {...register('role', { required: true })}
                placeholder='Enter Role'
              >
                <option value='USER'>USER</option>
                <option value='MODERATOR'>MODERATOR</option>
                <option value='ADMIN'>ADMIN</option>
              </Form.Select>
            </Form.Group>

            <Button className='ms-5' size='lg' variant='info' type='submit' id='submit'>
              Actualizar Usuario
            </Button>
            <Button className='ms-5' size='lg' variant='danger' onClick={() => resetPassword()}>
              Reiniciar contraseña
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export { ModalFormEditUser }
