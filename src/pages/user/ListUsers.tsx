import { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'

// Redux
import { selectUsers, userController } from '@/slices/user/userSlices'
import { useDispatch, useSelector } from 'react-redux'
import ModalFormCreateUser from './ModalFormCreateUser'
import { User, UserArray } from '@/interface/interfaces'
import ModalFormEditUser from './ModalFormEditUser'
import Swal from 'sweetalert2'

export default function ListUsers () {
  const dispatch = useDispatch()
  const list:UserArray = useSelector(selectUsers)
  useEffect(() => {
    userController.fetchAllUsers(dispatch)
  }, [dispatch])

  const handleDeleteUser = async (idUser:string) => {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Se eliminara TODA la informacion del usuario!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar usuario!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await userController.deleteUser(idUser)
      }
    })
  }
  return (
    <div className='m-5 '>
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
          {list.saveUsers?.map((userData:User) => {
            const user = userData

            return (
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
                  <ModalFormEditUser {...user} />
                </th>
                <th>
                  <Button variant='danger ' size='lg' onClick={() => { handleDeleteUser(user._id) }}>
                    Eliminar usuario
                  </Button>
                </th>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}
