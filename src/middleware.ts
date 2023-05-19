import { NextRequest, NextResponse } from 'next/server'
import { getTokenJose } from './getTokenJose'
import { NextApiResponse } from 'next'
export async function middleware (req:NextRequest, res: NextApiResponse) {
  const jwt = req.cookies.get('userLogin')
  if (jwt === undefined) {
    return NextResponse.redirect(new URL('/user/login', req.url))
  }

  try {
    await getTokenJose(jwt)
    return NextResponse.next()
  } catch (err) {
    res.status(401).json({ status: 'No tienes autirizacion' })
    return NextResponse.redirect(new URL('/user/login', req.url))
  }
}

export const config = { matcher: ['/income, /income/[id]'] }
