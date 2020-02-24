import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

const AddJob = () => {
  const [addJob, { data }] = useMutation(ADD_JOB)

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' placeholder='Machine' />
      <input type='text' placeholder='Complaint' />
      <input type='number' placeholder='Tech ID' />
      <button type='submit'>Add Job</button>
    </form>
  )
}

export default AddJob

const ADD_JOB = gql`
  mutation AddJob($type: String!) {
    addJob(type: $type) {
      id
      machine
      complaint
      tech_id
    }
  }
`
