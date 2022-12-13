import React, { useState } from 'react'
import '../index.css'

const Chat = () => {
  const [messageValue, setMessageValue] = useState('')
  return (
    <>
      <div className="chat">
        <div className="chat-users">
          <b>User (1)</b>
          <ul>
            <li>Test User</li>
          </ul>
        </div>
        <div className="chat-messages">
          <div className="messages">
            <div className="message">
              <p>lorem ipsum</p>
              <div>
                <span>Test User</span>
              </div>
            </div>
            <div className="message">
              <p>lorem ipsum</p>
              <div>
                <span>Test User</span>
              </div>
            </div>
          </div>
          <form>
            <textarea
              value={messageValue}
              onChange={(e) => setMessageValue(e.target.value)}
              className="form-control"
              rows="3"
            ></textarea>
            <button className="btn btn-primary">Send</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Chat
