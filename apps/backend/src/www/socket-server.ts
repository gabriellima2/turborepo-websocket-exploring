import WebSocket from 'ws'
import { IncomingMessage } from 'http'

import { Server } from './server'

let counter = 0

function onMessage(socket: WebSocket, data: WebSocket.RawData) {
  const initialCounter = Number(data.toString())
  if (isNaN(initialCounter) || initialCounter <= 0) return
  counter = initialCounter
  setInterval(() => {
    if (counter > 0) return socket.send(--counter);
    socket.send(`Chegamos ao final. Iniciamos em ${initialCounter} e terminamos em ${counter}`)
    socket.close()
  }, 1000)
}

function onError(socket: WebSocket, error: Error) {
  console.error(`onError: ${error.message}`)
}

function onConnection(socket: WebSocket, request: IncomingMessage) {
  socket.on('message', (data) => onMessage(socket, data))
  socket.on('error', (error) => onError(socket, error))
}

export function socketServer(server: Server) {
  const socket = new WebSocket.Server({ server })
  socket.on('connection', onConnection)
  console.log('Web Socket server is running!')
  return socket
}