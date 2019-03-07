module.exports = (ws, msg) => {
  db.get(msg.content.uid)
  .then(data => {
    sendTo(data.sock, 'RECEIVE_FILE', {
      host: ws._socket.remoteAddress.replace('::ffff:', ''),
      port: msg.content.port
    })
  })
  .catch(e => console.log)
}