import React from 'react'
import Badge from 'react-bootstrap/esm/Badge'
import Button from 'react-bootstrap/esm/Button'
import { useDispatch, useSelector } from 'react-redux'
import { incomesController, selectValueIncomes } from '@/slices/incomes/incomesSlices'

export const Pagination = () => {
  const listincomes = useSelector(selectValueIncomes)

  const dispatch = useDispatch()

  const nextPage = async (page:any) => {
    incomesController.fetchAllIncomes(dispatch, 'null', page + 1)
  }
  const prevPage = async (page:any) => {
    incomesController.fetchAllIncomes(dispatch, 'null', page - 1)
  }
  return (
    <div className='d-flex justify-content-center'>
      {listincomes.saveIncomes.hasPrevPage === false
        ? (
          <Button variant='info' type='submit' className='ms-2' disabled>
            anterior
          </Button>
          )
        : (
          <Button
            variant='info'
            type='submit'
            className='ms-2 '
            onClick={() => {
              prevPage(listincomes.saveIncomes.page)
            }}
          >
            anterior
          </Button>
          )}

      <div>
        <h6 className='d-inline-flex p-2 bd-highlight'>
          Pagina actual
        </h6>
        <Badge bg='secondary'>{listincomes.saveIncomes.page}</Badge>
      </div>
      {listincomes.saveIncomes.hasNextPage === false
        ? (
          <Button variant='info' type='submit' className='ms-2' disabled>
            siguiente
          </Button>
          )
        : (
          <Button
            variant='info'
            type='submit'
            className='ms-2 '
            onClick={() => {
              nextPage(listincomes.saveIncomes.page)
            }}
          >
            siguiente
          </Button>
          )}
    </div>
  )
}
