import express from "express"
import { getTodo, getTodoList, createTodo, deleteTodo } from "./database.js" 
import cors from "cors"


const app = express()

app.use(express.json())

// Enable CORS for all routes
app.use(cors());


app.get('/todoList', async (req, res) => {
  try {
    const todoList = await getTodoList()
    res.status(200).send(todoList)
  } catch(err) {
    console.error(err)
  }
  
})

app.get('/todoList/:id', async (req, res) => {
  const id = req.params.id
  const todo = await getTodo(id)
  res.status(200).send(todo)
})

app.post('/todoList', async (req, res) => {
  const { todo } = req.body
  const result = await createTodo(todo)
  console.log(result)
  res.status(201).send(result)
})

app.delete('/todoList/:id', async (req, res) => {
  const id = req.params.id
  await deleteTodo(id)
  res.status(204).end()
})

app.use((err, req, res, next) => { // error handling 
  console.log(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(5000, () => {
  console.log('Server is running on port 49355...')
})
