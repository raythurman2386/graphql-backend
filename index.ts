import server from './api/server';

server
  .listen({
    port: process.env.PORT || 4000
  })
  .then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
