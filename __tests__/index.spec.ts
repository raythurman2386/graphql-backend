import supertest from 'supertest';
import app from '../api/server';
import { gql } from 'apollo-server-express';

describe('Basic test for index', () => {
  test('should test Welcome Route', async () => {
    const res = await supertest(app).get('/');

    expect(res.status).toBe(200);
    expect(res.type).toBe('application/json');
    expect(res.text).toMatch(/Welcome to Team Builder API!/i);
  });

  test('should test signup mutation', async () => {
    const createUser = gql`
      mutation {
        register(
          data: {
            name: "Gbolahan Olagunju"
            email: "gbols@example.com"
            password: "dafe"
          }
        )
      }
    `;

    const res = await supertest(app)
      .post('/')
      .query(createUser);

    console.log(res.status);
  });

  test('should test login mutation', async () => {
    const loginUser = gql`
      mutation {
        login(data: { email: "gbols@example.com", password: "dafe" }) {
          token
        }
      }
    `;

    const res = await supertest(app)
      .post('/')
      .query(loginUser);

    console.log(res.status);
  });
});
