class res {
  constructor(socket) {
      this.socket = socket
  }

  send (message, content) {
    this.socket.write(JSON.stringify({
      message: `RES_${message}`,
      content: content
    }))
  }

  sendTo (sock, message, content) {
    sock.write(JSON.stringify({
      message: `RES_${message}`,
      content: content
    }))
  }

  get () {
    return this.socket
  }
}

module.exports = res