import { BrowserToken } from '@/interface/interfaces'
import { CookieValueTypes, getCookie, hasCookie } from 'cookies-next'
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'

export const decodeToken = () => {
  if (hasCookie('userLogin')) {
    const token:CookieValueTypes = getCookie('userLogin')!.toString()
    const payload:BrowserToken = jwt_decode(token)
    return payload
  }
  return null
}
