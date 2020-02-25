import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { client } from './apollo'
import Jobs from './components/Jobs'
import AddJob from './components/AddJob'

function App() {
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <h1>Hello</h1>
        <Jobs />
        <AddJob />
      </div>
    </ApolloProvider>
  )
}

export default App
