module.exports = (res, msg) => {
  db.get(msg.content.uid)
  .then(data => {
    sendTo(data.sock, 'RECEIVE_FILE', {
      host: res.get()._socket.remoteAddress.replace('::ffff:', ''),
      port: msg.content.port
    })
  })
  .catch(e => console.log)
}