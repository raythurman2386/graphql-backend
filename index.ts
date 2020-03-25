import "dotenv/config"
import app from './api/server';

const port = process.env.PORT;

app
  .listen(port, () => {
    console.log(`Server is running on port:${port}`)
  })
