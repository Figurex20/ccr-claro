/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Badge, Button } from 'react-bootstrap'
import { Calendar } from '@/generalComponents/Calendar'
import { incomesController } from '@/slices/incomes/incomesSlices'
import { SaveDataNewIncome } from '@/interface/interfaces'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

export default function income () {
  const [dateStart, setDateStart] = useState<null | string>(null)

  const { setValue, register, handleSubmit, reset, formState: { errors } } = useForm<SaveDataNewIncome>()

  const router = useRouter()
  const IdParam = router.query.id

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++ ++++++++++++++++++++++++++++++++++++++ +++++++++++++++++++++ */

  const onSubmit: SubmitHandler<SaveDataNewIncome> = async data => {
    if (!IdParam) {
      data.dateEnter = dateStart!
      if (data.rda.length > 7) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'La RDA es debe de ser de 7 digitos'
        })
      }
      Swal.fire({
        title: 'Estas seguro?',
        text: 'Se creara un nuevo ingreso',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, crear!'
      }).then((result) => {
        incomesController.newIncome(data).then(() => {
          reset()
          router.replace('/')
        })
      })
    } else {
      data.dateExit = dateStart!
      Swal.fire({
        title: 'Estas seguro?',
        text: 'Se actualizara el ingreso',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, actualizar!'
      }).then((result) => {
        incomesController.updateDataIncome(IdParam.toLocaleString(), data).then(() => {
          reset()
          router.replace('/')
        }).catch(() => { router.replace('/') })
      })
    }
  }

  const updateIncome = async (id: string) => {
    const response = await incomesController.getDataIncome(id)
    if (response) {
      setValue('name', response.data.name)
      setValue('site', response.data.site)
      setValue('whatdo', response.data.whatdo)
      setValue('rda', response.data.rda)
      setValue('exit', response.data.exit)
      setValue('comments', response.data.comments)
      setDateStart(response.data.dateEnter)
    }
  }
  /* +++++++++++++++++++++++++++++++++++++++++++++++++++ ++++++++++++++++++++++++++++++++++++++ +++++++++++++++++++++ */

  useEffect(() => {
    if (IdParam) {
      updateIncome(IdParam.toLocaleString())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
              <option value='MANTENIMIENTO PREVENTIVO INFRA'>Mantenimiento preventivo INFRA</option>
              <option value='INSTALACION DE EQUIPOS (PREVIAS)'>Instalacion de equipos (previas)</option>
              <option value='DESISTALACION DE EQUIPOS'>Desistalacion de equipos</option>
              <option value='INSTALACION, MEDICION O PRUEBAS DE FO'>Intalacion, medicion o pruebas de FO</option>
              <option value='INSTALACION DE EQUIPOS'>Instalacion de equipos</option>
              <option value='MANTENIMIENTO DE MG'>Mantenimiento de MG</option>
              <option value='REPARACION DE QUIEPOS'>Reparacion de equipos</option>
              <option value='COLOCACION DE VIÑETASs'>Colocacion de viñetas</option>
              <option value='MIGRACION DE EQUIPOS'>Migracion de equipos</option>
              <option value='Intalacion de tierras'>Intalacion de tierras</option>
              <option value='Certificacion de FO'>Certificacion de FO</option>
              <option value='CERTIFICACION DE FO'>Revision de sitio</option>
              <option value='CAMBIO DE IP'>Cambio de IP</option>
              <option value='SITE SURVEY'>Site Survey</option>
              <option value='AUDITORIA'>Auditoria</option>
              <option value='BATERIAS'>Baterias</option>
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

          <Form.Group className='mb-3' controlId='dateEnter'>
            <Form.Label>{IdParam ? ('Fecha de salida') : ('Fecha de ingreso')}</Form.Label>
            <Calendar setDate={setDateStart} test={dateStart} newDate={new Date()} />
          </Form.Group>
          {IdParam
            ? (
              <Form.Group className='mb-3' controlId='exit'>
                <Form.Check type='checkbox' label='Exit?' {...register('exit')} />
              </Form.Group>
              )
            : null}

          <Button variant={IdParam ? 'danger' : 'primary'} type='submit'>{IdParam ? 'Actualizar' : 'Guardar'}</Button>

        </Form>

      </div>
    </div>
  )
}
