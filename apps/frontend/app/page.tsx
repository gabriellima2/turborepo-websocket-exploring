'use client'
import { useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

const url = 'ws://localhost:3001'

const STATUS = {
  [ReadyState.CONNECTING]: 'Connecting',
  [ReadyState.OPEN]: 'Open',
  [ReadyState.CLOSING]: 'Closing',
  [ReadyState.CLOSED]: 'Closed',
  [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
}

export default function Page(): JSX.Element {
  const [isClicked, setIsClicked] = useState(false)
  const { sendMessage, lastMessage, readyState } = useWebSocket(url)
  const status = STATUS[readyState]
  return (
    <div>
      <button
        onClick={() => {
          sendMessage('21')
          setIsClicked(true)
        }}
        disabled={readyState !== ReadyState.OPEN || isClicked}
      >
        Start Counter.IO
      </button>
      <h1>Status: {status}</h1>
      <span>Counter: {lastMessage?.data || 0}</span>
    </div>
  )
}
