// import { NextApiRequest, NextApiResponse } from 'next'
// import { dbConnect } from '../utils'
// import NextCors from 'nextjs-cors'
// import { AuthController } from '../controllers/auth.controllers'
import { sign } from 'jsonwebtoken'
import { serialize } from 'cookie'
import NextCors from 'nextjs-cors'
// export default async function POST (req: NextApiRequest, res:NextApiResponse) {
//   await dbConnect()
//   const methods = ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE']
//   await NextCors(req, res, {
//     methods,
//     origin: '*',
//     optionsSuccessStatus: 200
//   })
//   AuthController.signNin(req, res)
//   res.status(200).json({ response: 'HOLA' })
// }

export default async function loginHandler (req:any, res:any) {
  const methods = ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE']
  await NextCors(req, res, {
    methods,
    origin: '*',
    optionsSuccessStatus: 200
  })
  const { userName, password } = req.body
  console.log(userName, password)
  if (userName === 'ccr-cr' && password === 'Claro+2023') {
    // expire in 30 days
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        userName,
        username: 'fazt'
      },
      'secret'
    )

    const serialized = serialize('myTokenName', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: '/'
    })

    res.setHeader('Set-Cookie', serialized)
    return res.status(200).json({
      message: 'Login successful'
    })
  }

  return res.status(401).json({ error: 'Invalid credentials' })
}
