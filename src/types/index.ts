import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type Query {
    techs: [Tech!]!
    jobs: [Job!]!
    tech(id: ID!): Tech
    job(id: ID!): Job
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

  type Subscription {
    newJob: Job
  }

  type Mutation {
    signup(email: String!, password: String!, name: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    addTech(name: String!): Tech
    addJob(machine: String!, complaint: String!, tech_id: ID!): Job
    updateTech(id: ID!, name: String!): Tech
    updateJob(id: ID!, machine: String, complaint: String, tech_id: Int): Job
    deleteTech(id: ID!): String
    deleteJob(id: ID!): Job
  }
`

export default typeDefs
