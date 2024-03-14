import mysql from 'mysql2'
import dotenv from 'dotenv'// required for using .env
dotenv.config()

const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQL_ROOT_PASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQL_DATABASE}`
const pool = mysql.createPool(urlDB).promise()

export async function getTodoList() {
  const [ rows ] = await pool.query("SELECT * FROM todoList")
  return rows
}

export async function getTodo(id) {
  const [ rows ] = await pool.query(`SELECT * FROM todoList WHERE id = ?`, [id])
  return rows[0]
}

export async function createTodo(todo) {
  const [ result ] = await pool.query(`
    INSERT INTO todoList (todo)
    VALUES (?)
  `, [todo])
  
  const id = result.insertId
  return await getTodo(id)
}

export async function deleteTodo(id) {
  const todo = JSON.stringify(await getTodo(id))
  console.log(`Deleted todo: ${todo}`)
  await pool.query(`
    DELETE FROM todoList 
    WHERE id = ?
  `, [id])
}







export async function createTable() {
  await pool.query(`CREATE TABLE todoList (
    id INT AUTO_INCREMENT PRIMARY KEY,
    todo VARCHAR(255) NOT NULL
  )`)
}

/*
main problem: spilling of food 
sub problems: inefficient use of space for foods
              lack of organization
*/
 