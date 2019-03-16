const http = require('http')
const sockjs = require('sockjs')
const router = require('./src/router.js')

const res = require('./src/modules/sockets.js')
const db = require('./src/modules/redis.js')

global.tempStorage = []

console.log(`

        ____             _ __                 
       / __ \\____  _____(_) /__________  ____ 
      / /_/ / __ \\/ ___/ / __/ ___/ __ \\/ __ \\
     / ____/ /_/ (__  ) / /_/ /  / /_/ / / / /
    /_/    \\____/____/_/\\__/_/   \\____/_/ /_/ 
    
    Hub

`)

const echo = sockjs.createServer()
echo.on('connection', conn => {
  
  resp = new res(conn)

  conn.on('data', msg => {
    msg = JSON.parse(msg)

    console.log(msg)

    router(msg.message).then(path => {
      require(path)(msg, resp, db)
    })
  })

  conn.on('close', () => {
    db.remove(conn.id)
  })
})

const server = http.createServer()
echo.installHandlers(server, { prefix:'/hub' })
server.listen(5112, '0.0.0.0')

console.log(`[SERVER] > Listening on 5112`)