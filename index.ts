import 'dotenv/config';
import 'reflect-metadata';
import app from './api/server';

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
