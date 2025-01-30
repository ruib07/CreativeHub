const request = require('supertest');
const jwt = require('jwt-simple');
const uuid = require('uuid');
const app = require('../../src/app');

const route = '/v1/comments';
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

test('Test #30 - Get a comment by Project ID', () => app.db('comments')
  .insert({
    comment: 'Really good project you made. Keep it up!',
    user_id: user.id,
    project_id: project.id,
  }, ['project_id'])
  .then((commentRes) => request(app).get(`${route}/${commentRes[0].project_id}`))
  .then((res) => {
    expect(res.status).toBe(200);
  }));

test('Test #31 - Creating a comment', async () => {
  await request(app).post(route)
    .set('Authorization', `bearer ${user.token}`)
    .send({
      comment: 'Really good project you made. Keep it up!',
      user_id: user.id,
      project_id: project.id,
    })
    .then((res) => {
      expect(res.status).toBe(201);
    });
});

test('Test #32 - Deleting an comment', async () => {
  const commentDel = await app.db('comments')
    .insert({
      comment: 'Really good project you made. Keep it up!',
      user_id: user.id,
      project_id: project.id,
    }, ['id']);

  const res = await request(app).delete(`${route}/${commentDel[0].id}`)
    .set('Authorization', `bearer ${user.token}`);

  expect(res.status).toBe(204);
});
