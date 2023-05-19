import { jwtVerify } from 'jose'

export const getTokenJose = async (jwtcookies) => {
  if (jwtcookies.value) {
    try {
      const { payload } = await jwtVerify(jwtcookies.value, new TextEncoder().encode(process.env.LOGIN))
      return payload
    } catch (error) {
      return { message: 'No tienes autorizacion' }
    }
  } else {
    try {
      const { payload } = await jwtVerify(jwtcookies.userLogin, new TextEncoder().encode(process.env.LOGIN))
      return payload
    } catch (error) {
      return { message: 'No tienes autorizacion' }
    }
  }
}
