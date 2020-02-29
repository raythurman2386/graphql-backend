require('dotenv').config
const express = require('express')
const cors = require('cors')
const graphqlHTTP = require('express-graphql')
const { GraphQLSchema } = graphql

const server = express()
server.use(
  cors({
    origin: '*',
    methods: 'GET,PUT,POST,DELETE',
    preflightContinue: false
  })
)

server.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
  })
)

module.exports = server
