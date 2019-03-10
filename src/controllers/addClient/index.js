module.exports = (msg, res, db) => {
  db.set(msg.content, {
    ip: res.get().remoteAddress.replace('::ffff:', ''),
    sock: res.get(),
    uid: msg.content
  })
}