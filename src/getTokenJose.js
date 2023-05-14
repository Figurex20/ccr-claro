import { jwtVerify } from 'jose'

export const getTokenJose = async (jwtcookies) => {
  if (jwtcookies.value) {
    const { payload } = await jwtVerify(jwtcookies.value, new TextEncoder().encode(process.env.LOGIN))
    return payload
  } else {
    const { payload } = await jwtVerify(jwtcookies.userLogin, new TextEncoder().encode(process.env.LOGIN))
    return payload
  }
}
