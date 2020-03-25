import "dotenv/config"
import server from './api/server';

const port = process.env.PORT;

server
  .listen(port, ({ url }) => {
    console.log(`Server is running on ${url}:${port}`)
  })
