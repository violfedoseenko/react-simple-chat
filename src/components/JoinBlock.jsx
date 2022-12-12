import React from 'react'
import socket from '../socket'

const JoinBlock = () => {
  return (
    <div className="wrapper">
      <input placeholder="Room ID" defaultValue="" />
      <input placeholder="Your name" defaultValue="" />
      <button onClick={socket} className="btn btn-success">
        {' '}
        Enter chat{' '}
      </button>
    </div>
  )
}

export default JoinBlock
