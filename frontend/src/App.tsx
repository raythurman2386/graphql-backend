import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { client } from './apollo'
import Jobs from './components/Jobs'

function App() {
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <h1>Hello</h1>
        <Jobs />
      </div>
    </ApolloProvider>
  )
}

export default App
