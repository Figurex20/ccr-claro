/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Badge, Button } from 'react-bootstrap'
import { Calendar } from '@/generalComponents/Calendar'
import { IncomesController } from '@/slices/incomes/incomesSlices'
import { LogsiteForm } from '@/interface/interfaces'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

export default function IncidenciaForm () {
  const [dateStart, setDateStart] = useState<null | string>(null)

  const { setValue, register, handleSubmit, reset, formState: { errors } } = useForm<LogsiteForm>()

  const router = useRouter()
  const IdParam = router.query.id

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++ ++++++++++++++++++++++++++++++++++++++ +++++++++++++++++++++ */

  const onSubmit: SubmitHandler<LogsiteForm> = async data => {
    if (!IdParam) {
      data.dateEnter = dateStart!
      data.close = !!data.close
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
          data.tracking = [
            {
              coment: data.comments,
              dateEnter: data.dateEnter
            }
          ]
          console.log(data.tracking)
          // reset()
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
        data.tracking.push({
          coment: data.comments,
          dateEnter: data.dateEnter
        })
        reset()
      })
    }
  }

  const selectData = async (response:any) => {
    setValue('Incidencia_Falla', response.name.toUpperCase())
    setValue('site', response.site.toUpperCase())
    setValue('cause', response.whatdo.toUpperCase())
    setValue('affect', response.affect.toUpperCase())
    setValue('close', response.close)
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
            <Form.Label>Incidencia/Falla</Form.Label>
            {errors.Incidencia_Falla && <Badge className='ms-1 bg-danger'>Este campo es requerido</Badge>}
            <Form.Control
              type='text'
              placeholder='Incidencia/Falla'
              {...register('Incidencia_Falla', { required: true })}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='whatdo'>
            <Form.Label>Causa</Form.Label>
            {errors.cause && <Badge className='ms-1 bg-danger'>Este campo es requerido</Badge>}
            <Form.Select
              aria-label='Default select example'
              {...register('cause', { required: true })}
            >
              <option value='2G FDS'>2G FDS</option>
              <option value='3G FDS'>3G FDS</option>
              <option value='4G FDS'>4G FDS</option>
              <option value='5G FDS'>5G FDS</option>
              <option value='SITIO FDS'>SITIO FDS</option>
              <option value='ENERGIA'>ENERGIA</option>
              <option value='CORTE DE FO'>CORTE DE FO</option>
              <option value='ALTA TEMPERATURA'>ALTA TEMPERATURA</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className='mb-3' controlId='affect'>
            <Form.Label>Afecta</Form.Label>
            {errors.affect && <Badge className='ms-1 bg-danger'>Este campo es requerido</Badge>}
            <Form.Control
              type='number'
              placeholder='Afecta'
              {...register('affect', { required: true })}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='affect'>
            <Form.Label>Comentario</Form.Label>
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
                  <Form.Group className='' controlId='close'>
                    <Form.Check type='checkbox' label='close?' {...register('close')} />
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
