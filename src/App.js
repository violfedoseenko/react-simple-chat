import React, { useEffect, useReducer } from 'react'
import JoinBlock from './components/JoinBlock'
import reducer from './reducer'
import socket from './socket'
import Chat from './components/Chat'
import './App.css'

function App() {
  const [state, dispatch] = useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
  })

  const onLogin = (obj) => {
    dispatch({ type: 'JOINED', payload: obj })
    socket.emit('ROOM: JOIN', obj)
  }
  useEffect(() => {
    //oбработчик сокетов: если пришел запрос ROOM: JOINED, вызывается функция
    socket.on('ROOM: JOINED', (users) => {
      console.log('новый пользователь', users)
    })
  }, [])

  return <>{state.joined ? <Chat /> : <JoinBlock onLogin={onLogin} />}</>
}

export default App
