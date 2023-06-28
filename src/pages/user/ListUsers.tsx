import { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'

// Redux
import { selectUsers, userController } from '@/slices/user/userSlices'
import { useDispatch, useSelector } from 'react-redux'
import { ModalFormCreateUser } from './ModalFormCreateUser'
import { User } from '@/interface/interfaces'
import { ModalFormEditUser } from './ModalFormEditUser'

export const ListUsers = () => {
  const dispatch = useDispatch()
  const list:User = useSelector(selectUsers)
  useEffect(() => {
    userController.fetchAllUsers(dispatch)
  }, [dispatch])

  const handleShow = () => { console.log('object') }

  return (
    <div className='m-5'>
      <div className='d-grid gap-2 '>
        <ModalFormCreateUser />
      </div>
      <Table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Informacion</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {list.saveUsers?.map((user:any) => (
            <tr key={user._id} className=' fs-6'>
              <th>
                <h6>Nombre: {user.name.toUpperCase()}</h6>
                <h6>Apellidos: {user.lastname.toUpperCase()}</h6>
              </th>
              <th>
                <h6>Usuario: {user.userName.toUpperCase()}</h6>
                <h6>Role: {user.role.toUpperCase()}</h6>
                <h6>Email: {user.email.toUpperCase()}</h6>
              </th>
              <th>
                <ModalFormEditUser user={user} />
              </th>
              <th>
                <Button variant='danger ' size='lg' onClick={handleShow}>
                  Eliminar usuario
                </Button>
              </th>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
