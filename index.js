const ws = require('ws')

const uidParser = require('./utils/uid')

const PORT = 8080
const map = new Map()

const wss = new ws.Server({ port: PORT })

wss.on('connection', ws => {
  const send = (message, content) => {
    ws.send(JSON.stringify({
      message: `RES_${message}`,
      content: content
    }))
  }

  ws.on('message', msg => {
    msg = JSON.parse(msg)

    console.log(msg)

    switch (msg.message) {
      case 'ADD_CLIENT':
        map.set(msg.content, uidParser(msg.content).ip)
      case 'GET_CLIENT':
        send('GET_CLIENT', map.get(msg.content))
      default:
        return 'nope'
    }
  })
 })

console.log(`[SERVER] > Listening on ${PORT}`)