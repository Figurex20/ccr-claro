import { useEffect } from 'react'
import { Table } from 'react-bootstrap'

// Redux
import { selectUsers, userController } from '@/slices/user/userSlices'
import { useDispatch, useSelector } from 'react-redux'
import { ModalFormCreateUser } from './ModalFormCreateUser'
// import { ModalFormEditUser } from './ModalFormEditUser'

export const ListUsers = () => {
  const dispatch = useDispatch()
  const list = useSelector(selectUsers)
  const listTest:any = [{
    name: 'Hola',
    lastname: 'pepe',
    userName: 'userName',
    role: 'admin',
    email: 'test@example.com'
  }]
  useEffect(() => {
    userController.fetchAllUsers(dispatch)
  }, [dispatch])

  return (
    <>
      <div className='d-grid gap-2'>
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
          {listTest.map((user:any) => (
            <tr key={user._id} className=' fs-6'>
              <th>
                <h6>Nombre: {user.name.toUpperCase()}</h6>
                <h6>Apellidos: {user.lastname.toUpperCase()}</h6>
              </th>
              <th>
                <h6>Usuario: {user.userName}</h6>
                <h6>Role: {user.role.toUpperCase()}</h6>
                <h6>Email: {user.email.toUpperCase()}</h6>
              </th>
              <th>
                {/* <ModalFormEditUser user={user} /> */}
              </th>

              {/* <th>
                <ModalValidations
                  funtionProps={deleteUser}
                  userID={user._id}
                  title='Eliminar usuario'
                  body={`¿Seguro que quieres eliminar el usuario: ${user.name}?`}
                  nameButton='Eliminar'
                />
              </th> */}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}
