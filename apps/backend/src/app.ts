import express, { Express } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'

export const app = express() as Express

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())

app.get('/', (request, response) => {
  response.json({ message: 'Hello' })
})

