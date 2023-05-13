import { connect, connection } from 'mongoose'

const conn = {
  isConnected: false
}

export async function dbConnect () {
  if (conn.isConnected) {
    return
  }
  const URI = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://127.0.0.1/TS'
  const db = await connect(URI)
  console.log(db.connection.db.databaseName)
  conn.isConnected = db.connections[0].readyState === 1
}

connection.on('connected', () => console.log('Mongodb connected to db'))

connection.on('error', (err) => console.error('Mongodb Errro:', err.message))
