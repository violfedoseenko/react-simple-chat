const express = require('express') //подключение библиотеки, благодаря кторой мы сможем подключать серверную часть

const app = express() // в этолй переменной хранится серверное приложение

const server = require('http').Server(app) // создание сервера. сервер будет работать через приложение app
const io = require('socket.io')(server) // подключение сокетов к серверу

const rooms = new Map() //{ rooms: [], messages: ['hello'] }

app.get('/rooms', (req, res) => {
  // rooms.set('hello', '') // добавление элемента в мэп - ключ и значение
  res.json(rooms)
})

io.on('connection', (socket) => {
  // когда произошло подключение пользователя к сокетам мы получаем переменную socket, которая будет
  // у каждого пользователя своя. В этой переменной будет храниться информация о пользователе.
  // Каждому пользователю задается свой уникальный id - socketId
  console.log('user connected', socket.id)
})

server.listen(9999, (err) => {
  if (err) {
    throw Error(err)
  }
  console.log('сервер запущен')
}) // приложение слушает порт
