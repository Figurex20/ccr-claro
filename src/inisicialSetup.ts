import { RoleModel } from './pages/api/models/modelRole'
import { UserModel } from './pages/api/models/modelUser'

export const createRoles = async () => {
  try {
    const countRole = await RoleModel.estimatedDocumentCount()

    if (countRole > 0) return

    await Promise.all([
      new RoleModel({ name: 'user' }).save(),
      new RoleModel({ name: 'moderator' }).save(),
      new RoleModel({ name: 'admin' }).save()
    ])
    console.log('success in creating roles')
  } catch (error) {
    const result = (error as DOMException).message
    console.log(result)
  }
}

export const createUserAdmin = async () => {
  try {
    const countUser = await UserModel.estimatedDocumentCount()

    if (countUser > 0) return

    const userAdmin = new UserModel({
      userName: 'CCR-CR',
      email: 'ccr-cr@claro.cr',
      password: await UserModel.encryptPassword('Claro+2023'),
      role: 'ADMIN',
      name: 'CCR',
      lastname: 'CCR',
      resetPassword: false
    })

    const roles = 'admin'

    const foundRoles = await RoleModel.find({ name: roles })
    userAdmin.roles = foundRoles

    await userAdmin.save()

    console.log('success in creating admin user')
  } catch (error) {
    const result = (error as DOMException).message
    console.log(result)
  }
}
