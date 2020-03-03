require('dotenv').config()
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('../types')
const resolvers = require('../resolvers')
const { User } = require('../models/Model')

// OAUTH STUFF
const passport = require('passport')
const { GraphQLLocalStrategy, buildContext } = require('graphql-passport')
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

const app = express()
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => buildContext({ req, res, User })
})

// Local login
passport.use(
  new GraphQLLocalStrategy(async (email, password, done) => {
    const user = await User.findBy(email)
    if (!user) {
      throw new Error('There has been an error')
    }
    done(null, { email, password })
  })
)

// Facebook login
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: 'http://localhost:4000/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'email']
    },
    function(accessToken, refreshToken, profile, cb) {
      console.log(profile)
      cb(null, profile)
    }
  )
)

// Google Login
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_KEY,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: 'http://localhost:4000/auth/google/callback'
    },
    function(token, tokenSecret, profile, done) {
      console.log(profile)
      done(null, user)
    }
  )
)

app.use(passport.initialize())

app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/login',
    session: false
  }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.send('Worked')
  }
)

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    scope: 'https://www.google.com/m8/feeds',
    failureRedirect: '/login',
    session: false
  }),
  function(req, res) {
    res.send('hola')
  }
)

server.applyMiddleware({ app, cors: false })

module.exports = { app }
