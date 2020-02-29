const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Query {
    techs: [Tech!]!
    jobs: [Job!]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }

  type Tech {
    id: ID!
    name: String!
    jobs: [Job!]!
  }

  type Job {
    id: ID!
    machine: String!
    complaint: String!
    serial: String!
    tech: Tech
  }

  type AuthPayload {
    token: String
    user: User
  }

  type Mutation {
    signup(email: String!, password: String!, name: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    addJob(
      machine: String!
      complaint: String!
      serial: String!
      tech: Tech
    ): Job
    updateJob(
      machine: String
      complaint: String
      serial: String
      tech: Tech
    ): Job
    deleteJob(id: ID!): Job
    addTech(name: String!): Tech
    updateTech(name: String!): Tech
    deleteTech(id: ID!): Tech
  }
`