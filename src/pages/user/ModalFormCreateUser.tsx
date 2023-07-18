import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import Form from 'react-bootstrap/Form'
import { SubmitHandler, useForm } from 'react-hook-form'
import { userController } from '@/slices/user/userSlices'
import { SaveDataNewUser } from '../../interface/interfaces'

export default function ModalFormCreateUser () {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<SaveDataNewUser>()

  const onSubmit: SubmitHandler<SaveDataNewUser> = async (data) => {
    try {
      const success = await userController.createUser(data)
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
      <Button variant='primary ' size='lg' className='mb-2' onClick={handleShow}>
        Crear Usuario
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
                type='text'
                placeholder='Enter name'
                {...register('name', { required: true })}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='lastname'>
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter last name'
                {...register('lastname', { required: true })}
              />
              {errors.password && <h5>password is required</h5>}
            </Form.Group>
            <Form.Group className='mb-3' controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter email'
                {...register('email', { required: true })}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='userName'>
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter username'
                {...register('userName', { required: true })}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='role'>
              <Form.Label>Role</Form.Label>
              <Form.Select
                aria-label='Default select example'
                {...register('role', { required: true })}
                // type='text'
                placeholder='Enter Role'
              >
                <option value='user'>user</option>
                <option value='moderator'>moderator</option>
                <option value='admin'>admin</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className='mb-3' controlId='Password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                {...register('password', { required: true })}
              />
              {errors.password && <h5>password is required</h5>}
            </Form.Group>
            <Form.Group className='mb-3' controlId='ConfirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm Password'
                {...register('confirmPassword', { required: true })}
              />
              {errors.password && <h5>password is required</h5>}
            </Form.Group>
            <Button className='col-md-12' variant='primary' type='submit' id='submit'>
              Guardar Usuario
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
