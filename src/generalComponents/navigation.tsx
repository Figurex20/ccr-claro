
import Link from 'next/link'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
const Navigation = () => {
  const closeLogin = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('idUser')
    sessionStorage.removeItem('role')
    sessionStorage.removeItem('resetPassword')
    alert('logout')
    window.location.replace('')
  }

  return (
    <nav className=''>
      <div className='d-flex justify-content-between navbar-dark bg-dark px-3 py-3'>
        {sessionStorage.getItem('token')
          ? (
            <>
              <DropdownButton id='Usuario' title='Usuario' variant='info'>
                <h5 className=' ms-5 mt-2'>{sessionStorage.getItem('user')}</h5>

                {sessionStorage.getItem('role') === 'admin'
                  ? (
                    <>
                      <Dropdown.Item>
                        <Link className='navbar-brand ms-1 mt-2 text-dark' href='/users'>
                          Usuarios
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link className='navbar-brand ms-1 mt-2 text-dark' href='/changepassword'>
                          Cambiar contraseña
                        </Link>
                      </Dropdown.Item>
                    </>
                    )
                  : (
                    <Dropdown.Item>
                      <Link className='navbar-brand ms-4 mt-2 text-dark' href='/users'>
                        cambiar Contraseña
                      </Link>
                    </Dropdown.Item>
                    )}

                <Dropdown.Item>
                  <Button variant='danger' className=' ms-4 mt-2' onClick={closeLogin}>
                    Cerrar
                  </Button>
                </Dropdown.Item>
              </DropdownButton>

              {/* <div div className='container'>
                  {sampleLocation.pathname === '/' ? <SearchIncome /> : null}
                </div> */}

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
              {/* {sampleLocation.pathname === '/' ? <SearchIncome /> : null} */}
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
