module.exports = (msg, res, db) => {
  console.log(res.get())
  db.set(msg.content, {
    ip: res.get()._socket.remoteAddress.replace('::ffff:', ''),
    sock: res.get(),
    uid: msg.content
  })
}