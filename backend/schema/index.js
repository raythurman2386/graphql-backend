const graphql = require('graphql')
const { GraphQLObjectType, GraphQLSchema } = graphql
const userSchema = require('./userSchema')
const techSchema = require('./techSchema')
const jobSchema = require('./jobSchema')
const { Mutation } = require('../mutations')

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...userSchema,
    ...techSchema,
    ...jobSchema
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery, // get
  mutation: Mutation // post put delete
})
