import { deleteCookie } from 'cookies-next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Swal from 'sweetalert2'
import { decodeToken } from '@/decodeToken'
import { BrowserToken } from '@/interface/interfaces'
export const DropdownNavigationUser = () => {
  const token: BrowserToken | null = decodeToken()

  const router = useRouter()
  const closeLogin = () => {
    deleteCookie('userLogin')
    Swal.fire({
      icon: 'success',
      title: 'Logout',
      text: 'Exito al cerrar seccion'
    })
    router.replace('./')
  }
  return (
    <DropdownButton id='Usuario' title='Usuario' variant='info' className='mb-1 ms-4 mt-2 '>
      <h5 className=' ms-5 mt-2'>{sessionStorage.getItem('user')}</h5>

      {token?.role === 'ADMIN'
        ? (
          <>
            <Dropdown.Item>
              <Link className='navbar-brand ms-1 mt-2 text-dark' href='/user'>
                Usuarios
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link className='navbar-brand ms-1 mt-2 text-dark' href='/user/changepassword'>
                Cambiar contraseña
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link className='navbar-brand ms-1 mt-2 text-dark' href='/informationSites'>
                Ver informacion de los sitios
              </Link>
            </Dropdown.Item>
          </>
          )
        : (
          <Dropdown.Item>
            <Link className='navbar-brand ms-4 mt-2 text-dark' href='/user/changepassword'>
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
  )
}
