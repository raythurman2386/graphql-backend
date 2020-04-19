import 'dotenv/config';
import app from './api/server';

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
