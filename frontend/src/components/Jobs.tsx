import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const Jobs = () => {
  const { loading, error, data } = useQuery(JOBS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div>
      {data.jobs.map(
        (wholeObject: {
          id: number
          machine: string
          complaint: string
          tech: { name: number }
        }) => (
          <div>
            <p>Machine: {wholeObject.machine}</p>
            <p>Complaint: {wholeObject.complaint}</p>
            <p>Tech Name: {wholeObject.tech.name}</p>
          </div>
        )
      )}
    </div>
  )
}

export default Jobs

// This is the GraphQL Query
// The data you have in here is what it will pull in
// Add as much or as little as you need
const JOBS = gql`
  {
    jobs {
      id
      machine
      complaint
      tech {
        name
      }
    }
  }
`
