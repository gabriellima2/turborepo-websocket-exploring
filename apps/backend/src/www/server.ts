import { app } from '../app'
import { socketServer } from './socket-server'

const server = app.listen(3001, () => {
  console.log('Server is running!')
})

socketServer(server)

export type Server = typeof server
