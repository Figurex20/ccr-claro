// import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'

export default function login (req: any, res: any) {
  const { userName, password } = req.body

  if (userName === 'ccr-cr' && password === 'Claro+2023') {
    const token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) * 24 * 60 * 60,
      userName
    },
    'secret')

    const serealized = serialize('userLogin', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: '/user/login'
    })

    res.setHeader('set-cookie', serealized)
    return res.json('login route')
  }
}
