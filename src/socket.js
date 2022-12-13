import io from 'socket.io-client'

const socket = io() //отправка get запроса на сервер каждые 5 секунд  на бэк

export default socket
