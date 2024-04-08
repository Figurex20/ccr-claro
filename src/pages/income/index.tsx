/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Badge, Button } from 'react-bootstrap'
import { Calendar } from '@/generalComponents/Calendar'
import { IncomesController } from '@/slices/incomes/incomesSlices'
import { SaveDataNewIncome } from '@/interface/interfaces'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

export default function Income () {
  const [dateStart, setDateStart] = useState<null | string>(null)

  const { setValue, register, handleSubmit, reset, formState: { errors } } = useForm<SaveDataNewIncome>()

  const router = useRouter()
  const IdParam = router.query.id

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++ ++++++++++++++++++++++++++++++++++++++ +++++++++++++++++++++ */

  const onSubmit: SubmitHandler<SaveDataNewIncome> = async data => {
    if (data.rda.length !== 7) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La RDA debe de ser de 7 digitos'
      })

      return
    }

    if (!IdParam) {
      data.dateEnter = dateStart!
      data.exit = !!data.exit
      Swal.fire({
        title: 'Estas seguro?',
        text: 'Se creara un nuevo ingreso',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, crear!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          IncomesController.newIncome(data).then(() => {
            reset()
            router.replace('/')
          })
        }
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
        if (result.isConfirmed) {
          IncomesController.updateDataIncome(IdParam.toLocaleString(), data).then(() => {
            reset()
            router.replace('/')
          }).catch(() => { console.log('object') })
        }
      })
    }
  }

  const selectData = async (response:any) => {
    setValue('name', response.name.toUpperCase())
    setValue('site', response.site.toUpperCase())
    setValue('whatdo', response.whatdo.toUpperCase())
    setValue('rda', response.rda.toUpperCase())
    setValue('exit', response.exit)
    setValue('comments', response.comments.toUpperCase())
    setDateStart(response.dateEnter)
  }

  const updateIncome = async (id: string) => {
    const response = await IncomesController.getDataIncome(id)
    if (response) {
      await selectData(response)
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
    <div className='col-md-6 offset-md-3 mt-3 '>
      <div className='card card-body pb-2 '>
        <h2 className='text-center'>Nuevo Ingreso</h2>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className='mb-3' controlId='site'>
            <Form.Label>Sitio</Form.Label>
            {errors.site && <Badge className='ms-1 bg-danger'>Este campo es requerido</Badge>}
            <Form.Control
              type='text'
              placeholder='Sitio'
              {...register('site', { required: true })}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='name'>
            <Form.Label>Nombre</Form.Label>
            {errors.name && <Badge className='ms-1 bg-danger'>Este campo es requerido</Badge>}
            <Form.Control
              type='text'
              placeholder='Nombre'
              {...register('name', { required: true })}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='whatdo'>
            <Form.Label>Trabajo a realizar</Form.Label>
            {errors.whatdo && <Badge className='ms-1 bg-danger'>Este campo es requerido</Badge>}
            <Form.Select
              aria-label='Default select example'
              {...register('whatdo', { required: true })}
            >
              <option value='INSTALACION, MEDICION O PRUEBAS DE FO'>Intalacion, medicion o pruebas de FO</option>
              <option value='MANTENIMIENTO PREVENTIVO TELECOM'>Mantenimiento preventivo TELECOM</option>
              <option value='INSTALACION DE EQUIPOS (PREVIAS)'>Instalacion de equipos (previas)</option>
              <option value='MANTENIMIENTO PREVENTIVO INFRA'>Mantenimiento preventivo INFRA</option>
              <option value='DESISTALACION DE EQUIPOS'>Desistalacion de equipos</option>
              <option value='INSTALACION DE EQUIPOS'>Instalacion de equipos</option>
              <option value='INSTALACION DE TIERRAS'>Instalacion de tierras</option>
              <option value='REPARACION DE QUIEPOS'>Reparacion de equipos</option>
              <option value='COLOCACION DE VIÑETAS'>Colocacion de viñetas</option>
              <option value='MIGRACION DE EQUIPOS'>Migracion de equipos</option>
              <option value='MANTENIMIENTO DE MG'>Mantenimiento de MG</option>
              <option value='Certificacion de FO'>Certificacion de FO</option>
              <option value='REVISION DE SITIO'>Revision de sitio</option>
              <option value='CAMBIO DE IP'>Cambio de IP</option>
              <option value='INTEGRACION'>Integracion</option>
              <option value='SITE SURVEY'>Site Survey</option>
              <option value='AUDITORIA'>Auditoria</option>
              <option value='BATERIAS'>Baterias</option>
              <option value='VENTANA'>Ventana</option>
              <option value='OTROS'>Otros</option>
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

          <Form.Group className='mb-1' controlId='dateEnter'>
            <Form.Label>{IdParam ? ('Fecha de salida') : ('Fecha de ingreso')}</Form.Label>
            <Calendar setDate={setDateStart} test={dateStart} newDate={new Date()} />
          </Form.Group>
          <div className=''>
            <div className='d-flex'>
              <Button className='btn-sm me-5' variant={IdParam ? 'danger' : 'primary'} type='submit'>{IdParam ? 'Actualizar' : 'Guardar'}</Button>

              {IdParam
                ? (
                  <Form.Group className='' controlId='exit'>
                    <Form.Check type='checkbox' label='Exit?' {...register('exit')} />
                  </Form.Group>
                  )
                : null}

            </div>
          </div>

        </Form>

      </div>
    </div>
  )
}
