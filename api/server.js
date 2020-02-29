const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('../types')
const resolvers = require('../resolvers')

const app = express()

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.applyMiddleware({ app })

module.exports = server
