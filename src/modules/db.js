const db = {
  get (key) {
    return new Promise(resolve => {
      console.log(tempStorage)
      for (i in tempStorage) {
        if (tempStorage[i].key === key) {
          resolve(tempStorage[i].value)
          break
        }
      }
    })
  },

  set (key, value) {
    tempStorage.push({
      key: key,
      value: value
    })
  },

  remove (id) {
    for (i in tempStorage) {
      if (id === tempStorage[i].value.sock.id) {
        tempStorage.splice(i, 1)
        break
      }
    }
  }
}

module.exports = db
