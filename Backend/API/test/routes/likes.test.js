const request = require('supertest');
const jwt = require('jwt-simple');
const uuid = require('uuid');
const app = require('../../src/app');

const route = '/v1/likes';
const secret = 'userCreativeHub@2025';

const generateUniqueEmail = () => `${uuid.v4()}@gmail.com`;
const generateUniqueCategoryName = () => `Category-${uuid.v4()}`;

let user;
let category;
let project;

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

  const categoryRes = await app.services.category.save({
    name: generateUniqueCategoryName(),
  });

  category = { ...categoryRes[0] };

  const projectRes = await app.services.project.save({
    title: 'CreativeHub',
    description: 'A system where designers, photographers and developers can create and display their portfolios in an organized way.',
    tags: ['#creativehub', '#softwareengineer', '#webapp'],
    image_urls: [
      'https://st.depositphotos.com/1002111/1650/i/450/depositphotos_16501773-stock-photo-business-team.jpg',
      'https://st2.depositphotos.com/1258191/8287/i/450/depositphotos_82878128-stock-photo-business-professionals-working-together.jpg',
    ],
    category_id: category.id,
    user_id: user.id,
  });

  project = { ...projectRes[0] };
});

test('Test #43 - Get likes by User ID', () => app.db('likes')
  .insert({
    user_id: user.id,
    project_id: project.id,
  }, ['user_id'])
  .then((likesRes) => request(app).get(`${route}/byUser/${likesRes[0].user_id}`)
    .set('Authorization', `bearer ${user.token}`))
  .then((res) => {
    expect(res.status).toBe(200);
  }));

test('Test #44 - Get likes by Project ID', () => app.db('likes')
  .insert({
    user_id: user.id,
    project_id: project.id,
  }, ['project_id'])
  .then((likesRes) => request(app).get(`${route}/byProject/${likesRes[0].project_id}`)
    .set('Authorization', `bearer ${user.token}`))
  .then((res) => {
    expect(res.status).toBe(200);
  }));

test('Test #45 - Creating a like', async () => {
  await request(app).post(route)
    .set('Authorization', `bearer ${user.token}`)
    .send({
      user_id: user.id,
      project_id: project.id,
    })
    .then((res) => {
      expect(res.status).toBe(201);
    });
});

test('Test #46 - Deleting a like', async () => {
  const likeDel = await app.db('likes')
    .insert({
      user_id: user.id,
      project_id: project.id,
    }, ['id']);

  const res = await request(app).delete(`${route}/${likeDel[0].id}`)
    .set('Authorization', `bearer ${user.token}`);

  expect(res.status).toBe(204);
});
