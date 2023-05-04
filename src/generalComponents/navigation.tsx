
import Link from 'next/link'
import { useRouter } from 'next/router'
import { DropdownNavigationUser } from './DropdownNavigationUser'
import { SearchIncome } from '../incomes/SearchIncome'
const Navigation = () => {
  const router = useRouter()

  return (
    <nav className=''>
      <div className='d-flex justify-content-between navbar-dark bg-dark px-3 py-3'>
        {sessionStorage.getItem('token')
          ? (
            <>
              <DropdownNavigationUser />

              <div className='container'>
                {router.pathname === '/' ? <SearchIncome /> : null}
              </div>

              <Link className='navbar-brand me-3' href='/'>
                <h5>Lista de ingresos</h5>
              </Link>
              <Link className='navbar-brand ' href='/createincome'>
                <h5>Guardar ingresos</h5>
              </Link>
            </>
            )
          : (
            <>
              <Link className='navbar-brand' href='/user'>
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
