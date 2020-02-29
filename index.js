const server = require('./api/server')

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
