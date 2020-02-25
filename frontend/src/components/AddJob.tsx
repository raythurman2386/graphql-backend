import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

const AddJob = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [addJob, { data }] = useMutation(ADD_JOB)
  const [machine, setMachine] = useState('')
  const [complaint, setComplaint] = useState('')
  const [techId, setTechId] = useState(1)

  const handleSubmit = (e: { preventDefault: () => void }) => {
    addJob({
      variables: {
        machine,
        complaint,
        tech_id: techId
      }
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={machine}
        onChange={e => setMachine(e.target.value)}
        placeholder='Machine'
      />
      <input
        type='text'
        value={complaint}
        onChange={e => setComplaint(e.target.value)}
        placeholder='Complaint'
      />
      <input
        type='number'
        value={techId}
        onChange={e => setTechId(e.target.valueAsNumber)}
        placeholder='Tech ID'
      />
      <button type='submit'>Add Job</button>
    </form>
  )
}

export default AddJob

// This is the GraphQL Mutation
// Specify what data the mutation requires
const ADD_JOB = gql`
  mutation AddJob($type: String) {
    addJob(type: $type) {
      machine
      complaint
      tech_id
    }
  }
`
