const server = require('./api/server')

const PORT = process.env.PORT || 4000

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
