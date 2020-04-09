[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/raythurman2386/graphql-backend)
![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg)
![Typescript](https://img.shields.io/npm/types/typescript.svg?style=flat)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Maintainability](https://api.codeclimate.com/v1/badges/b7e6dd16f0c9616587df/maintainability)](https://codeclimate.com/github/raythurman2386/graphql-backend)

# graphql-backend

To work on this project, once you clone down the files run:

```
npm install
```

For development:

```
npm run server
```

For deployment

```
npm start
```

Start will build the project as well as start the server

## Tech Stack Used

- Node
- Apollo Server
- GraphQL
- TypeScript
- Bcrypt
- jsonwebtokens
- jest
- supertest
- Prettier

## GraphQL Schema

```
type Job {
  id: ID!
  machine: String!
  complaint: String!
  serial: String!
  tech: Tech
}

type Mutation {
  signup(email: String!, password: String!, name: String!): AuthPayload
  login(email: String!, password: String!): AuthPayload
  addTech(name: String!): Tech
  addJob(machine: String!, complaint: String!, tech_id: ID): Job
  updateTech(id: ID!, name: String!): Tech
  updateJob(id: ID!, machine: String, complaint: String, tech_id: Int): Job
  deleteTech(id: ID!): String
  deleteJob(id: ID!): Job
}

type Query {
  techs: [Tech]!
  jobs: [Job]!
  tech(id: ID!): Tech
  job(id: ID!): Job
}

type Subscription {
  newJob: Job
}

type Tech {
  id: ID!
  name: String!
  jobs: [Job]
}

type User {
  id: ID!
  name: String!
  email: String!
  password: String!
}

```

#License
MIT License
