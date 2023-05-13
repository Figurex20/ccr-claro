import { NextRequest, NextResponse } from 'next/server'

export async function middleware (req:NextRequest) {
  const jwt = req.cookies.get('mytoken')

  if (jwt === undefined) {
    return NextResponse.redirect(new URL('/user/login', req.url))
  }
}

export const config = { matcher: ['/income'] }
