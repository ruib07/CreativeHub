const request = require('supertest');
const uuid = require('uuid');
const app = require('../../src/app');

const signinRoute = '/auth/signin';
const signupRoute = '/auth/signup';
const byIdRoute = '/v1/users/:id';

const generateUniqueEmail = () => `${uuid.v4()}@gmail.com`;

test('Test #13 - Receiving token when a user authenticates', () => {
  const userEmail = generateUniqueEmail();

  return request(app).post(signupRoute)
    .send({
      name: 'User1Auth',
      email: userEmail,
      password: 'User1@Auth-123',
      role: 'developer',
      bio: 'A software engineer who locks to write a clean code to other people understand better',
      avatar_url: 'https://i.redd.it/y7sphew02ldd1.jpeg',
    })
    .then((signupRes) => {
      expect(signupRes.status).toBe(201);
      return request(app).post(signinRoute)
        .send({
          name: 'User1Auth',
          password: 'User1@Auth-123',
        });
    })
    .then((signinRes) => {
      expect(signinRes.status).toBe(200);
      expect(signinRes.body).toHaveProperty('token');
    });
});

test('Test #14 - Wrong authentication attempt for users', () => {
  const userEmail = generateUniqueEmail();

  return app.services.userRegistration.save({
    name: 'User2Auth',
    email: userEmail,
    password: 'User2@Auth-123',
    role: 'developer',
    bio: 'A software engineer who locks to write a clean code to other people understand better',
    avatar_url: 'https://i.redd.it/y7sphew02ldd1.jpeg',
  })
    .then(() => request(app).post(signinRoute)
      .send({
        name: 'User2',
        password: 'User2@Auth-12',
      }))
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Invalid authentication!');
    });
});

test('Test #15 - Access protected user routes', () => request(app).post(byIdRoute)
  .then((res) => {
    expect(res.status).toBe(401);
  }));

test('Test #16 - Creating a user', () => {
  const userEmail = generateUniqueEmail();

  return request(app).post(signupRoute)
    .send({
      name: 'User3Auth',
      email: userEmail,
      password: 'User3@Auth-123',
      role: 'developer',
      bio: 'A software engineer who locks to write a clean code to other people understand better',
      avatar_url: 'https://i.redd.it/y7sphew02ldd1.jpeg',
    })
    .then((res) => {
      expect(res.status).toBe(201);
    });
});
