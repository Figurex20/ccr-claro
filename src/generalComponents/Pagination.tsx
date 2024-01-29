import React from 'react'
import { Badge, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { IncomesController, selectValueIncomes } from '@/slices/incomes/incomesSlices'
import { selectDateSearch } from '@/slices/incomes/dataSearch'
import ImportDataExcel from '@/pages/income/ImportDataExcel'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import Image from 'next/image'
import linkedin from '../styles/linkedin.svg'
import styles from '@/styles/Home.module.css'

export const Pagination = () => {
  const listincomes = useSelector(selectValueIncomes)
  const dateSearch = useSelector(selectDateSearch)

  const dispatch = useDispatch()

  const nextPage = async (page:number) => {
    IncomesController.fetchAllIncomes(dispatch, page + 1, dateSearch)
  }
  const prevPage = async (page:number) => {
    IncomesController.fetchAllIncomes(dispatch, page - 1, dateSearch)
  }
  return (
    <div className='d-flex justify-content-evenly p-2 bg-dark'>
      {listincomes.saveIncomes.hasPrevPage === false
        ? (
          <Button variant='info' type='submit' className='ms-2' disabled>
            <FaArrowLeft />
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
            <FaArrowRight />
          </Button>
          )}
      <div>
        <h6 className='d-inline-flex p-2 bd-highlight text-info'>
          Pagina actual
        </h6>
        <Badge bg='secondary'>{listincomes.saveIncomes.page}</Badge>
        <h6 className='d-inline-flex p-2 bd-highlight text-danger'>
          Paginas totales
        </h6>
        <Badge bg='secondary m-1'>{listincomes.saveIncomes.totalPages}</Badge>
      </div>
      {listincomes.saveIncomes.hasNextPage === false
        ? (
          <Button variant='info' type='submit' className='ms-2' disabled>
            <FaArrowRight />
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
            <FaArrowRight />
          </Button>
          )}

      <div className='d-flex '>
        <ImportDataExcel />
        <div className={`${styles.imgHover}`}>
          <div className={`${styles.imgContainer}`}>
            <Image
              priority
              src={linkedin}
              height={33}
              width={33}
              alt='Follow us on Twitter'
            />
            <p className=''>Desarrollado por: Kenneth Alonso Gomez Martinez</p>
          </div>
        </div>

      </div>

    </div>
  )
}
