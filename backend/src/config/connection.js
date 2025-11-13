import mysql from 'mysql2/promise'
import 'dotenv/config'

let connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Lelu*13182506",
  database: "saudedb"
})


export { connection }