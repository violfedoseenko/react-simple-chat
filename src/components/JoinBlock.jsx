import React, { useState } from 'react'
import axios from 'axios'

const JoinBlock = ({ onLogin }) => {
  const [roomId, setRoomId] = useState('')
  const [userName, setUserName] = useState('')
  const [loading, setLoading] = useState(false)
  const onEnter = () => {
    setLoading(true)
    if (!roomId || !userName) return alert('Incorrect data'), setLoading(false)
    const obj = {
      roomId,
      userName,
    }
    axios.post('/rooms', obj).then(onLogin(obj))
  }

  return (
    <div className="wrapper">
      <input
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <input
        placeholder="Your name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button disabled={loading} onClick={onEnter} className="btn btn-success">
        {loading ? 'Moment...' : 'Enter chat'}
      </button>
    </div>
  )
}

export default JoinBlock
