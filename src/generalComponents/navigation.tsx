
import Link from 'next/link'
import { useRouter } from 'next/router'
import { DropdownNavigationUser } from './DropdownNavigationUser'
import SearchIncome from '../pages/income/SearchIncome'
import { decodeToken } from '@/decodeToken'
import { BrowserToken } from '@/interface/interfaces'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { IncomesController } from '@/slices/incomes/incomesSlices'
import iconClaro from '../styles/iconClaro.svg'
import Image from 'next/image'
const Navigation = () => {
  const router = useRouter()
  const token: BrowserToken | null = decodeToken()
  const dispatch = useDispatch()
  useEffect(() => {
    if (token?.resetPassword) {
      router.replace('/user/changepassword')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token?.resetPassword])

  return (
    <nav>
      <div className='d-flex justify-content-between navbar-dark bg-dark px-3 pt-1 my-0 '>
        <Image
          priority
          src={iconClaro}
          height={50}
          width={50}
          alt='Follow us on Twitter'
        />
        {token !== null
          ? (
            <>
              <DropdownNavigationUser />

              <div className='container'>
                {router.pathname === '/' ? <SearchIncome /> : null}
              </div>

              <Link
                className='navbar-brand me-5  mt-4' href='/' onClick={() => {
                  IncomesController.fetchAllIncomes(dispatch, 1)
                }}
              >
                <h5>Lista de ingresos</h5>
              </Link>
              <Link className='navbar-brand mt-4' href='/income'>
                <h5>Guardar ingresos</h5>
              </Link>
            </>
            )
          : (
            <>
              <Link className='navbar-brand' href='/user/login'>
                <h4>
                  Usuario
                </h4>
              </Link>
              {router.pathname === '/' ? <SearchIncome /> : null}
              <Link
                className='navbar-brand' href='/' onClick={() => {
                  IncomesController.fetchAllIncomes(dispatch, 1)
                }}
              >
                <h4>
                  Ingresos
                </h4>
              </Link>
            </>
            )}
      </div>
    </nav>
  )
}

export { Navigation }
