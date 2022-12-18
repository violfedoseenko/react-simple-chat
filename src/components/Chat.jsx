import React, { useRef, useState, useEffect } from 'react'
import socket from '../socket'
import '../index.css'

const Chat = ({ users, messages, userName, roomId, onAddMessage }) => {
  const [messageValue, setMessageValue] = useState('')

  const messagesRef = useRef(null)

  const onSendMessage = () => {
    socket.emit('ROOM: NEW_MESSAGE', { roomId, userName, text: messageValue })
    onAddMessage({ userName, text: messageValue })
    setMessageValue('')
  }

  useEffect(() => {
    messagesRef.current.scrollTo(0, 99999)
  }, [messages])

  return (
    <>
      <div className="chat">
        <div className="chat-users">
          Комната: <b>{roomId}</b>
          <hr />
          <b>Online ({users.length}):</b>
          <ul>
            {users.map((user, index) => (
              <li key={user + index}>{user}</li>
            ))}
          </ul>
        </div>
        <div className="chat-messages">
          <div ref={messagesRef} className="messages">
            {messages.map((message, index) => (
              <div className="message" key={index}>
                <p>{message.text}</p>
                <div>
                  <span>{message.userName}</span>
                </div>
              </div>
            ))}
          </div>
          <form>
            <textarea
              value={messageValue}
              onChange={(e) => setMessageValue(e.target.value)}
              className="form-control"
              rows="3"
            ></textarea>
            <button
              onClick={onSendMessage}
              type="button"
              className="btn btn-primary"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Chat
