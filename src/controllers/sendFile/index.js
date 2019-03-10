module.exports = (msg, res, db) => {
  db.get(msg.content.uid)
  .then(data => {
    sendTo(data.sock, 'RECEIVE_FILE', {
      host: res.get().remoteAddress.replace('::ffff:', ''),
      port: msg.content.port
    })
  })
  .catch(e => console.log)
}