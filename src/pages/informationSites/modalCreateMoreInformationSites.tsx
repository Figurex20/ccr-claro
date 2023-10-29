import { InformationSite } from '@/interface/interfaces'
import { informationSiteController } from '@/slices/informationSites/informationSiteSlices'
import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
// import { InformationSite } from '../../interface/interfaces'

export const ModalCreateMoreInformationSites = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<any>()

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const onSubmit: SubmitHandler<InformationSite> = async (data) => {
    try {
      const success = await informationSiteController.createInformationSite(data)
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

      <Button variant='primary ' size='lg' className='mb-2 btn btn-primary ms-5 me-5' onClick={handleShow}>
        Crear multiples sitios
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className='mb-3' controlId='name'>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type='file'
                placeholder='Enter file'
                {...register('file', { required: true })}
              />
            </Form.Group>
            {errors.file && <h5>El archivo es requerido</h5>}

            <Button className='col-md-12' variant='primary' type='submit' id='submit'>
              Guardar Usuario
            </Button>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
