const express = require('express') //подключение библиотеки, благодаря кторой мы сможем подключать серверную часть

const app = express() // в этой переменной хранится серверное приложение

const server = require('http').Server(app) // создание сервера. сервер будет работать через приложение app
const io = require('socket.io')(server) // подключение сокетов к серверу

app.use(express.json()) //приложение может принимать запросы, содержащие данные json

const rooms = new Map() //{ rooms: [], messages: ['hello'] }

app.get('/rooms/:id', (req, res) => {
  // rooms.set('hello', '') // добавление элемента в мэп - ключ и значение
  const { id: roomId } = req.params
  const obj = rooms.has(roomId)
    ? {
        users: [...rooms.get(roomId).get('users').values()],
        messages: [...rooms.get(roomId).get('messages').values()],
      }
    : { users: [], messages: [] }
  res.json(obj)
})

app.post('/rooms', (req, res) => {
  const { roomId, userName } = req.body
  if (!rooms.has(roomId)) {
    rooms.set(
      roomId,
      new Map([
        ['users', new Map()],
        ['messages', []],
      ])
    )
  }
  res.json([...rooms.keys()])
})

io.on('connection', (socket) => {
  // когда произошло подключение пользователя к сокетам мы получаем переменную socket, которая будет
  // у каждого пользователя своя. В этой переменной будет храниться информация о пользователе.
  // Каждому пользователю задается свой уникальный id - socketId

  //  ОБЛАСТЬ: ДЕЙСТВИЕ
  socket.on('ROOM: JOIN', ({ roomId, userName }) => {
    socket.join(roomId)
    // в конкретной комнате, в коллекции пользователей сохраняем вошедшего пользователя
    rooms.get(roomId).get('users').set(socket.id, userName)
    // получаем имена пользователей
    const users = [...rooms.get(roomId).get('users').values()]
    // в определенной комнате все кроме меня получат сокет со списком подключенных к комнате пользователей
    socket.broadcast.to(roomId).emit('ROOM: SET_USERS', users)
  })

  socket.on('ROOM: NEW_MESSAGE', ({ roomId, userName, text }) => {
    const obj = { userName, text }

    rooms.get(roomId).get('messages').push(obj)
    socket.broadcast.to(roomId).emit('ROOM: NEW_MESSAGE', obj)
  })

  socket.on('disconnect', () => {
    // в value попадает Map([['users', new Map()],['messages', []]])
    rooms.forEach((value, roomId) => {
      //  возвращается булево
      if (value.get('users').delete(socket.id)) {
        const users = [...value.get('users').values()]
        socket.broadcast.to(roomId).emit('ROOM: SET_USERS', users)
      }
    })
  })
})

server.listen(9999, (err) => {
  if (err) {
    throw Error(err)
  }
  console.log('сервер запущен')
}) // приложение слушает порт
