import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

const AddJob = () => {
  const [addJob, { data }] = useMutation(ADD_JOB)
  return <div></div>
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
