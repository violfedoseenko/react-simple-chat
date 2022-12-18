import React, { useEffect, useReducer } from 'react'
import axios from 'axios'
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
    users: [],
    messages: [],
  })

  useEffect(() => {
    //oбработчик сокетов: если пришел запрос ROOM: SET_USERS, вызывается функция
    socket.on('ROOM: SET_USERS', setUsers)
    socket.on('ROOM: NEW_MESSAGE', addMessage)
  }, [])

  const setUsers = (users) => {
    dispatch({ type: 'SET_USERS', payload: users })
  }

  const addMessage = (message) => {
    dispatch({ type: 'NEW_MESSAGE', payload: message })
  }

  const onLogin = async (obj) => {
    dispatch({ type: 'JOINED', payload: obj }) // оповещение фронтэнда о том , что зашли
    socket.emit('ROOM: JOIN', obj) // оповещение сокетов
    const { data } = await axios.get(`/rooms/${obj.roomId}`) // запрос актуальных данных у сервера по пользователям и сообщениям
    console.log('data', data)
    dispatch({ type: 'SET_DATA', payload: data })
  }

  return (
    <>
      {state.joined ? (
        <Chat {...state} onAddMessage={addMessage} />
      ) : (
        <JoinBlock onLogin={onLogin} />
      )}
    </>
  )
}

export default App
