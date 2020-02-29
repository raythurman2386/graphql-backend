require('dotenv').config()
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('../types')
const resolvers = require('../resolvers')

// OAUTH STUFF
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy

const app = express()
const server = new ApolloServer({
  typeDefs,
  resolvers
})

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: 'https://5b99b571.ngrok.io/auth/facebook/callback'
    },
    function(accessToken, refreshToken, profile, cb) {
      console.log(profile)
      cb(null, profile)
    }
  )
)

app.use(passport.initialize())

app.get('/facebook', passport.authenticate('facebook'))

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

server.applyMiddleware({ app })

module.exports = { app, server }
