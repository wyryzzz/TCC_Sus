import mysql from 'mysql2/promise'
import 'dotenv/config'

let connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "saudedb"
})


export { connection }