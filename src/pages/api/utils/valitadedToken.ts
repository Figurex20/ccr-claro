import { getTokenJose } from '@/getTokenJose'

export const valitadeCookies = async (req: Partial<{[key: string]: string;}>) => {
  const token = req
  if (!token) {
    return { message: 'Debe de haber un token' }
  }

  const respond = await getTokenJose(token)

  if (respond.message === 'No tienes autorizacion') return { message: 'No tienes autorizacion' }

  return { token: respond }
}
