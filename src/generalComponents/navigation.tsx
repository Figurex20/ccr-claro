
import Link from 'next/link'
import { useRouter } from 'next/router'
import { DropdownNavigationUser } from './DropdownNavigationUser'
import SearchIncome from '../pages/income/SearchIncome'
// import { hasCookie } from 'cookies-next'
import { decodeToken } from '@/decodeToken'
import { BrowserToken } from '@/interface/interfaces'
import { useEffect } from 'react'
const Navigation = () => {
  const router = useRouter()
  const token: BrowserToken | null = decodeToken()

  useEffect(() => {
    if (token?.resetPassword) {
      router.replace('/user/changepassword')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token?.resetPassword])

  return (
    <nav>
      <div className='d-flex justify-content-between navbar-dark bg-dark px-3 pt-1 my-0'>
        {token !== null
          ? (
            <>
              <DropdownNavigationUser />

              <div className='container'>
                {router.pathname === '/' ? <SearchIncome /> : null}
              </div>

              <Link className='navbar-brand me-3' href='/'>
                <h5>Lista de ingresos</h5>
              </Link>
              <Link className='navbar-brand ' href='/income'>
                <h5>Guardar ingresos</h5>
              </Link>
            </>
            )
          : (
            <>
              <Link className='navbar-brand' href='/user/login'>
                Usuario
              </Link>
              {router.pathname === '/' ? <SearchIncome /> : null}
              <Link className='navbar-brand' href='/'>
                Ingresos
              </Link>
            </>
            )}
      </div>
    </nav>
  )
}

export { Navigation }
