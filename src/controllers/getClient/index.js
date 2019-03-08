module.exports = (res, msg) => {
  db.get(msg.content)
  .then(data => {
    console.log(data)
    res.send('GET_CLIENT', {
      ip: data.ip,
      uid: data.uid
    })
  })
  .catch(e => console.log)
}