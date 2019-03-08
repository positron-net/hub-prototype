const ws = require('ws')
const router = require('./src/router.js')

const res = require('./src/modules/sockets.js')
global.db = require('./src/modules/redis.js')

const PORT = 5112

const wss = new ws.Server({ port: PORT })

wss.on('connection', ws => {
  resp = new res(ws)

  ws.on('message', msg => {
    msg = JSON.parse(msg)

    console.log(msg)

    router(msg.message).then(path => {
      require(path)(resp, msg)
    })

  })
})

console.log(`[SERVER] > Listening on ${PORT}`)