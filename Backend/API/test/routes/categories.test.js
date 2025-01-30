const request = require('supertest');
const jwt = require('jwt-simple');
const uuid = require('uuid');
const app = require('../../src/app');

const route = '/v1/categories';
const secret = 'userCreativeHub@2025';

const generateUniqueEmail = () => `${uuid.v4()}@gmail.com`;
const generateUniqueCategoryName = () => `Category-${uuid.v4()}`;

let user;

beforeAll(async () => {
  const userEmail = generateUniqueEmail();

  const userRegistration = await app.services.userRegistration.save({
    name: 'User1',
    email: userEmail,
    password: 'User1@Created-12',
    role: 'developer',
    bio: 'A software engineer who locks to write a clean code to other people understand better',
    avatar_url: 'https://i.redd.it/y7sphew02ldd1.jpeg',
  });

  user = { ...userRegistration[0] };
  user.token = jwt.encode(user, secret);
});

test('Test #16 - Get all Categories', () => request(app).get(route)
  .then((res) => {
    expect(res.status).toBe(200);
  }));

test('Test #17 - Register a category', async () => {
  const res = await request(app).post(route)
    .set('Authorization', `bearer ${user.token}`)
    .send({
      name: generateUniqueCategoryName(),
    });

  expect(res.status).toBe(201);
});

describe('Category creation validation', () => {
  const testTemplate = (newData, errorMessage) => request(app).post(route)
    .set('Authorization', `bearer ${user.token}`)
    .send({
      name: generateUniqueCategoryName(),
      ...newData,
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe(errorMessage);
    });

  test('Test #18 - Insert a category without name', () => testTemplate({ name: null }, 'Name is required!'));
});

test('Test #19 - Updating user data', () => app.db('categories')
  .insert({
    name: generateUniqueCategoryName(),
  }, ['id'])
  .then((categoryRes) => request(app).put(`${route}/${categoryRes[0].id}`)
    .set('Authorization', `bearer ${user.token}`)
    .send({
      name: generateUniqueCategoryName(),
    }))
  .then((res) => {
    expect(res.status).toBe(200);
  }));

test('Test #20 - Deleting an category', async () => {
  const categoryDel = await app.db('categories')
    .insert({
      name: generateUniqueCategoryName(),
    }, ['id']);

  const res = await request(app).delete(`${route}/${categoryDel[0].id}`)
    .set('Authorization', `bearer ${user.token}`);

  expect(res.status).toBe(204);
});
