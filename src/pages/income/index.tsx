/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Badge, Button } from 'react-bootstrap'
import { Calendar } from '@/generalComponents/Calendar'
import { incomesController } from '@/slices/incomes/incomesSlices'
import { SaveDataNewIncome } from '@/interface/interfaces'
// import { Calendar } from '@/generalComponents/Calendar'

export default function edit () {
  const [dateStart, setDateStart] = useState('')

  const { register, handleSubmit, reset, formState: { errors } } = useForm<SaveDataNewIncome>()
  const onSubmit: SubmitHandler<SaveDataNewIncome> = async data => {
    data.dateEnter = dateStart
    data.nameEnter = sessionStorage.getItem('user') || 'CCR'
    incomesController.newIncome(data).then(() => { reset() })
  }

  return (
    <div className='col-md-6 offset-md-3'>
      <div className='card card-body'>
        <h2 className='text-center'>Income</h2>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className='mb-3' controlId='name'>
            <Form.Label>Name</Form.Label>
            {errors.name && <Badge className='ms-1 bg-danger'>Este campo es requerido</Badge>}
            <Form.Control
              type='text'
              placeholder='Name'
              {...register('name', { required: true })}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='site'>
            <Form.Label>Site</Form.Label>
            {errors.site && <Badge className='ms-1 bg-danger'>Este campo es requerido</Badge>}
            <Form.Control
              type='text'
              placeholder='Site'
              {...register('site', { required: true })}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='whatdo'>
            <Form.Label>What are you going to do?</Form.Label>
            {errors.whatdo && <Badge className='ms-1 bg-danger'>Este campo es requerido</Badge>}
            <Form.Select
              aria-label='Default select example'
              {...register('whatdo', { required: true })}
            >
              <option value='Instalacion, medicion o pruebas de FO'>
                Instalacion, medicion o pruebas de FO
              </option>
              <option value='Mantenimiento preventivo TELECOM'>
                Mantenimiento preventivo TELECOM
              </option>
              <option value='Mantenimiento preventivo INFRA'>Mantenimiento preventivo INFRA</option>
              <option value='Instalacion de equipos (previas'>
                Instalacion de equipos (previas)
              </option>
              <option value='Desistalacion de equipos'>Desistalacion de equipos</option>
              <option value='Instalacion de equipos'>Instalacion de equipos</option>
              <option value='Mantenimiento de MG'>Mantenimiento de MG</option>
              <option value='Reparacion de quiepos'>Reparacion de equipos</option>
              <option value='Colocacion de viñetas'>Colocacion de viñetas</option>
              <option value='Migracion de equipos'>Migracion de equipos</option>
              <option value='Intalacion de tierras'>Intalacion de tierras</option>
              <option value='Certificacion de FO'>Certificacion de FO</option>
              <option value='Revision de sitio'>Revision de sitio</option>
              <option value='Cambio de IP'>Cambio de IP</option>
              <option value='Site Survey'>Site Survey</option>
              <option value='Auditoria'>Auditoria</option>
              <option value='Baterias'>Baterias</option>
              <option value='ATP'>ATP</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className='mb-3' controlId='rda'>
            <Form.Label>RDA</Form.Label>
            {errors.rda && <Badge className='ms-1 bg-danger'>Este campo es requerido</Badge>}
            <Form.Control
              type='number'
              placeholder='RDA'
              {...register('rda', { required: true })}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='rda'>
            <Form.Label>Comentarios</Form.Label>
            <Form.Control type='text' placeholder='Comentarios' {...register('comments')} />
          </Form.Group>

          <Form.Group className='mb-3' controlId='calendar'>
            <Form.Label>Calandario</Form.Label>
            <Calendar setDate={setDateStart} newDate={new Date()} />
          </Form.Group>

          <Form.Group className='mb-3' controlId='exit'>
            <Form.Check type='checkbox' label='Exit?' {...register('exit')} />
          </Form.Group>

          <Button variant='primary' type='submit'>
            Save
          </Button>

        </Form>

      </div>
    </div>
  )
}
