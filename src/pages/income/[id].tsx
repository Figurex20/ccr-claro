/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
// import { Badge, Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from 'react-bootstrap'
// import { Calendar } from '@/generalComponents/Calendar'

type FormValues = {
  name: string;
  site: string;
  rda: string;
  comments: string;
  whatdo: string;
  exit: boolean;
};

export default function edit () {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const [dateStart, setDateStart] = useState(null)
  // const [dateEnd, setDateEnd] = useState(null)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter()

  const id = router.query

  const { register, handleSubmit } = useForm<FormValues>()
  const onSubmit: SubmitHandler<FormValues> = data => console.log(data)

  return (
    <div className='col-md-6 offset-md-3'>
      <div className='card card-body'>
        <h2 className='text-center'>Income</h2>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className='mb-3' controlId='name'>
            <Form.Label>Name</Form.Label>
            {/* {errors.name && <Badge className='ms-1 bg-danger'>Este campo es requerido</Badge>} */}
            <Form.Control
              type='text'
              placeholder='Name'
              {...register('name')}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='site'>
            <Form.Label>Site</Form.Label>
            {/* {errors.site && <Badge className='ms-1 bg-danger'>Este campo es requerido</Badge>} */}
            <Form.Control
              type='text'
              placeholder='Site'
              {...register('site')}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='whatdo'>
            <Form.Label>What are you going to do?</Form.Label>
            {/* {errors.whatdo && <Badge className='ms-1 bg-danger'>Este campo es requerido</Badge>} */}
            <Form.Select
              aria-label='Default select example'
              {...register('whatdo')}
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
            {/* {errors.rda && <Badge className='ms-1 bg-danger'>Este campo es requerido</Badge>} */}
            <Form.Control
              type='number'
              placeholder='RDA'
              {...register('rda')}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='rda'>
            <Form.Label>Comentarios</Form.Label>
            <Form.Control type='text' placeholder='Comentarios' {...register('comments')} />
          </Form.Group>

          {!id
            ? (
              <Form.Group className='mb-3' controlId='calendar'>
                <Form.Label>Calandario</Form.Label>
                {/* <Calendar setDate={setDateStart} newDate={new Date()} /> */}
              </Form.Group>
              )
            : (
              <>
                <Form.Group className='mb-3' controlId='calendar'>
                  <Form.Label>Entrada</Form.Label>
                  {/* <Calendar setDate={setDateStart} newDate={new Date(dateStart)} /> */}
                </Form.Group>
                <Form.Group className='mb-3' controlId='calendar'>
                  <Form.Label>Salida</Form.Label>
                  {/* <Calendar setDate={setDateEnd} newDate={new Date()} /> */}
                </Form.Group>
              </>
              )}

          <Form.Group className='mb-3' controlId='exit'>
            <Form.Check type='checkbox' label='Exit?' {...register('exit')} />
          </Form.Group>

          {!id
            ? (
              <Button variant='primary' type='submit'>
                Save
              </Button>
              )
            : null}
        </Form>
        {/* {id
          ? (
            <Form className='mt-2' onSubmit={updateIncomeData}>
              <Button variant='danger' type='submit'>
                Update
              </Button>
            </Form>
            )
          : null} */}
      </div>
    </div>
  )
}
