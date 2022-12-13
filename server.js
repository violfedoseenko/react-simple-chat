const express = require('express') //подключение библиотеки, благодаря кторой мы сможем подключать серверную часть

const app = express() // в этолй переменной хранится серверное приложение

const server = require('http').Server(app) // создание сервера. сервер будет работать через приложение app
const io = require('socket.io')(server) // подключение сокетов к серверу

app.use(express.json()) //приложение может принимать запросы, содержащие данные json

const rooms = new Map() //{ rooms: [], messages: ['hello'] }

app.get('/rooms', (req, res) => {
  // rooms.set('hello', '') // добавление элемента в мэп - ключ и значение
  res.json(rooms)
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
    socket.broadcast.to(roomId).emit('ROOM: JOINED', users)
    console.log('user connected', socket.id)
  })
})

server.listen(9999, (err) => {
  if (err) {
    throw Error(err)
  }
  console.log('сервер запущен')
}) // приложение слушает порт
