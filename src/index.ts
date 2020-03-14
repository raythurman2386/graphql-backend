import server from './api/server'

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
