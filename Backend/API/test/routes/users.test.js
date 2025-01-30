const request = require('supertest');
const jwt = require('jwt-simple');
const uuid = require('uuid');
const app = require('../../src/app');

const route = '/v1/users';
const secret = 'userCreativeHub@2025';

const generateUniqueEmail = () => `${uuid.v4()}@gmail.com`;

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

test('Test #10 - Get user by his ID', () => {
  const userEmail = generateUniqueEmail();

  return app.db('users')
    .insert({
      name: 'User2',
      email: userEmail,
      password: 'User2@Created-12',
      role: 'developer',
      bio: 'A software engineer who locks to write a clean code to other people understand better',
      avatar_url: 'https://i.redd.it/y7sphew02ldd1.jpeg',
    }, ['id'])
    .then((userRes) => request(app).get(`${route}/${userRes[0].id}`))
    .then((res) => {
      expect(res.status).toBe(200);
    });
});

test('Test #11 - Updating user data', () => {
  const userEmail = generateUniqueEmail();

  return app.db('users')
    .insert({
      name: 'User2',
      email: userEmail,
      password: 'User2@Created-12',
      role: 'developer',
      bio: 'A software engineer who locks to write a clean code to other people understand better',
      avatar_url: 'https://i.redd.it/y7sphew02ldd1.jpeg',
    }, ['id'])
    .then((userRes) => request(app).put(`${route}/${userRes[0].id}`)
      .set('Authorization', `bearer ${user.token}`)
      .send({
        name: 'User3',
        email: userEmail,
        password: 'User3@Created-12',
        role: 'designer',
        bio: 'A Designer who loves to make the design for web and mobile apps.',
        avatar_url: 'https://uploads.jovemnerd.com.br/wp-content/uploads/2023/03/naruto_episodios_ineditos__3kf0w13t5.jpg',
      }))
    .then((res) => {
      expect(res.status).toBe(200);
    });
});

test('Test #12 - Deleting an user', async () => {
  const userEmail = generateUniqueEmail();

  const userDel = await app.db('users')
    .insert({
      name: 'User4',
      email: userEmail,
      password: 'User4@Created-12',
      role: 'developer',
      bio: 'A software engineer who locks to write a clean code to other people understand better',
      avatar_url: 'https://i.redd.it/y7sphew02ldd1.jpeg',
    }, ['id']);

  const res = await request(app).delete(`${route}/${userDel[0].id}`)
    .set('Authorization', `bearer ${user.token}`);

  expect(res.status).toBe(204);
});
