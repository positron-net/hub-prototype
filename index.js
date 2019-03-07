const ws = require('ws')
const router = require('./src/router.js')
global.db = require('./src/modules/redis.js')

const PORT = 5112

const wss = new ws.Server({ port: PORT })

wss.on('connection', ws => {
  global.send = (message, content) => {
    ws.send(JSON.stringify({
      message: `RES_${message}`,
      content: content
    }))
  }

  global.send.to = (sock, message, content) => {
    sock.send(JSON.stringify({
      message: `RES_${message}`,
      content: content
    }))
  }

  ws.on('message', msg => {
    msg = JSON.parse(msg)

    console.log(msg)

    router(msg.message).then(path => {
      require(path)(ws, msg)
    })

  })
})

console.log(`[SERVER] > Listening on ${PORT}`)