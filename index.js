const ws = require('ws')

const PORT = 5112
const db = new Map()

const wss = new ws.Server({ port: PORT })

wss.on('connection', ws => {
  const send = (message, content) => {
    ws.send(JSON.stringify({
      message: `RES_${message}`,
      content: content
    }))
  }

  const sendTo = (sock, message, content) => {
    sock.send(JSON.stringify({
      message: `RES_${message}`,
      content: content
    }))
  }

  ws.on('message', msg => {
    msg = JSON.parse(msg)

    console.log(msg)

    switch (msg.message) {
      case 'ADD_CLIENT':
        db.set(msg.content, {
          ip: ws._socket.remoteAddress.replace('::ffff:', ''),
          sock: ws,
          uid: msg.content
        })
        break
      case 'GET_CLIENT':
        if (db.has(msg.content)) {
          send('GET_CLIENT', {
            ip: db.get(msg.content).ip,
            uid: db.get(msg.content).uid
          })
        }
        break
      case 'SEND_FILE':
        if (db.has(msg.content.uid)) {
          sendTo(db.get(msg.content.uid).sock, 'RECEIVE_FILE', {
            host: ws._socket.remoteAddress.replace('::ffff:', ''),
            port: msg.content.port
          })
        }
        break
      default:
        return 'nope'
    }
  })
})

console.log(`[SERVER] > Listening on ${PORT}`)