import { jwtVerify } from 'jose'

export const getTokenJose = async (jwtcookies) => {
  const { payload } = await jwtVerify(jwtcookies.value, new TextEncoder().encode(process.env.LOGIN))
  return payload
}
