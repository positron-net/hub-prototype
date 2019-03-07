const redis = require("redis")
const client = redis.createClient()

const db = {
  get (key) {
    return new Promise((resolve, reject) => {
      client.get(key, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(JSON.parse(data))
        }
      })
    })
  },

  set (key, value) {
    client.set(key, JSON.stringify(value), err => {
      if (err) {
        console.log(err)
      }
    })
  }
}

client.on('error', err => {
  console.log(`[REDIS] > ${err}`)
})

client.on('ready', err => {
  console.log(`[REDIS] > Connected !`)
})

client.on('reconnecting', err => {
  console.log(`[REDIS] > Reconnecting...}`)
})

module.exports = db