import 'dotenv/config'
import { ApolloServer } from 'apollo-server'
import typeDefs from '../types'
import resolvers from '../resolvers'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: process.env.NODE_ENV === 'development' || false
})

export default server
