class res {
  constructor(socket) {
      this.socket = socket
  }

  send (message, content) {
    this.socket.send(JSON.stringify({
      message: `RES_${message}`,
      content: content
    }))
  }

  sendTo (sock, message, content) {
    sock.send(JSON.stringify({
      message: `RES_${message}`,
      content: content
    }))
  }

  get () {
    return this.socket
  }
}

module.exports = res