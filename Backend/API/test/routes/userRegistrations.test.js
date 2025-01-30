const request = require('supertest');
const uuid = require('uuid');
const app = require('../../src/app');

const route = '/v1/userRegistrations';
const generateUniqueEmail = () => `${uuid.v4()}@gmail.com`;

test('Test #3 - Register a user', async () => {
  const userEmail = generateUniqueEmail();

  const res = await request(app).post(route)
    .send({
      name: 'User1',
      email: userEmail,
      password: 'User1@Created-12',
      role: 'developer',
      bio: 'A software engineer who locks to write a clean code to other people understand better',
      avatar_url: 'https://i.redd.it/y7sphew02ldd1.jpeg',
    });

  expect(res.status).toBe(201);
});

test('Test #3.1 - Save ecripted password', async () => {
  const userEmail = generateUniqueEmail();

  const res = await request(app).post(route)
    .send({
      name: 'User2',
      email: userEmail,
      password: 'User2@Created-12',
      role: 'developer',
      bio: 'A software engineer who locks to write a clean code to other people understand better',
      avatar_url: 'https://i.redd.it/y7sphew02ldd1.jpeg',
    });

  expect(res.status).toBe(201);

  const { id } = res.body[0];
  const userRegistrationInDb = await app.services.user.find({ id });
  expect(userRegistrationInDb.password).not.toBeUndefined();
  expect(userRegistrationInDb.password).not.toBe('User2@Created-12');
});

describe('User creation validation', () => {
  const userEmail = generateUniqueEmail();

  const testTemplate = (newData, errorMessage) => request(app).post(route)
    .send({
      name: 'User3',
      email: userEmail,
      password: 'User3@Created-12',
      role: 'developer',
      bio: 'A software engineer who locks to write a clean code to other people understand better',
      avatar_url: 'https://i.redd.it/y7sphew02ldd1.jpeg',
      ...newData,
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe(errorMessage);
    });

  test('Test #4 - Insert a user without name', () => testTemplate({ name: null }, 'Name is required!'));
  test('Test #5 - Insert a user without email', () => testTemplate({ email: null }, 'Email is required!'));
  test('Test #6 - Insert a user without password', () => testTemplate({ password: null }, 'Password is required!'));
  test('Test #7 - Insert a user without role', () => testTemplate({ role: null }, 'Role is required!'));
  test('Test #8 - Insert a user without bio', () => testTemplate({ bio: null }, 'Bio is required!'));
  test('Test #9 - Insert a user without avatar url', () => testTemplate({ avatar_url: null }, 'Avatar is required!'));
});
