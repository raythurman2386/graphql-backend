import request from 'supertest'
const db = require('../data/db-config')

let server: any

beforeEach(() => {
  server = require('../api/server').default
})

afterEach((done) => {
  server.close()
  done()
})

describe('Testing Job Queries', () => {

  test('should test the get jobs query', (done) => {
    request(server)
      .post('/graphql')
      .send({ query: '{ jobs { machine complaint } }' })
      .expect(200)
    done()
  })

  test('should test getting a job by id of 1', (done) => {
    request(server)
      .post('/graphql')
      .send({ query: '{ job(id: 1) { machine complaint }' })
      .expect(200)
    // expect(res.status).toBe(200)
    // expect(res.type).toBe('application/json')
    // expect(res.body.data.job.machine).toMatch(/test/i)
    // console.log(res.status)
    done()
  })
})
