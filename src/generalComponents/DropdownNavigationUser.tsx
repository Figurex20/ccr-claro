import Link from 'next/link'
import React from 'react'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

export const DropdownNavigationUser = () => {
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
  )
}
