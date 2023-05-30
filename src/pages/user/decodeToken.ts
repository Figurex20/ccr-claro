import { getCookie, hasCookie } from 'cookies-next'
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'

export const decodeToken = () => {
  if (hasCookie('userLogin')) {
    const token:any = getCookie('userLogin')
    console.log(typeof token)
    // const dataToken = JSON.stringify(jwt_decode(token))
    // const payload = JSON.parse(jwt_decode(dataToken))
    const payload = jwt_decode(token)
    return payload
  }
  return null
}
