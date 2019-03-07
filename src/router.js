const routes = require('./router.json')

module.exports = request => {
  return new Promise((resolve, reject) => {
    for (i in routes) {
      if (routes[i].request === request) {
        resolve(`./src/controllers/${routes[i].name}/index.js`)
        break
      } else if (i === routes.length) {
        reject()
        break
      }
    }
  })
}