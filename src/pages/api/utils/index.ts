import { createRoles, createUserAdmin } from '@/inisicialSetup'
export { runMiddleware } from './runMiddleware'
export { dbConnect } from './mongoose'

const initialState = async () => {
  await createRoles()
  await createUserAdmin()
}

initialState()
