import 'dotenv/config'
import { ApolloServer } from 'apollo-server'
import typeDefs from '../types'
import resolvers from '../resolvers'

const server = new ApolloServer({
  cors: {
    origin: process.env.ORIGIN,
    credentials: true
  },
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
})

export default server
