module.exports = (ws, msg) => {
  db.get(msg.content)
  .then(data => {
    console.log(data)
    send('GET_CLIENT', {
      ip: data.ip,
      uid: data.uid
    })
  })
  .catch(e => console.log)
}