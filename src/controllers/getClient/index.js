module.exports = (msg, res, db) => {
  db.get(msg.content)
  .then(data => {
    res.send('GET_CLIENT', {
      ip: data.ip,
      uid: data.uid
    })
  })
  .catch(e => console.log)
}