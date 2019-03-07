module.exports = (ws, msg) => {
  db.set(msg.content, {
    ip: ws._socket.remoteAddress.replace('::ffff:', ''),
    sock: ws,
    uid: msg.content
  })
}