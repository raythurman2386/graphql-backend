import supertest from 'supertest'
import app from '../api/server';

describe('Basic test for index', () => {
  test('should test Welcome Route', async () => {
    const res = await supertest(app).get('/')

    expect(res.status).toBe(200)
    expect(res.type).toBe('application/json')
    expect(res.text).toMatch(/Welcome to Team Builder API!/i)
  });

  test('should test signup mutation', async () => {
    const query = {
      register(name: "Test", email: "test@test.com", password: "test")
    }

    const res = await supertest(app).post('/graphql').query(query)

    console.log(res)

  })

  test('should test login mutation', async () => {
    const query = {
      login(email: "test@test.com", password: "test") {
        token
      }
    }

    const res = await supertest(app).post('/graphql').query(query)

    console.log(res)
  })

});
