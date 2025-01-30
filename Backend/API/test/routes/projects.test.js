const request = require('supertest');
const jwt = require('jwt-simple');
const uuid = require('uuid');
const app = require('../../src/app');

const route = '/v1/projects';
const secret = 'userCreativeHub@2025';

const generateUniqueEmail = () => `${uuid.v4()}@gmail.com`;
const generateUniqueCategoryName = () => `Category-${uuid.v4()}`;

let user;
let category;

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
});

test('Test #21 - Get all projects', () => request(app).get(route)
  .then((res) => {
    expect(res.status).toBe(200);
  }));

test('Test #22 - Get a project by his ID', () => app.db('projects')
  .insert({
    title: 'CreativeHub',
    description: 'A system where designers, photographers and developers can create and display their portfolios in an organized way.',
    tags: ['#creativehub', '#softwareengineer', '#webapp'],
    image_urls: [
      'https://st.depositphotos.com/1002111/1650/i/450/depositphotos_16501773-stock-photo-business-team.jpg',
      'https://st2.depositphotos.com/1258191/8287/i/450/depositphotos_82878128-stock-photo-business-professionals-working-together.jpg',
    ],
    category_id: category.id,
    user_id: user.id,
  }, ['id'])
  .then((projectRes) => request(app).get(`${route}/${projectRes[0].id}`))
  .then((res) => {
    expect(res.status).toBe(200);
  }));

test('Test #23 - Creating a project', async () => {
  await request(app).post(route)
    .set('Authorization', `bearer ${user.token}`)
    .send({
      title: 'CreativeHub',
      description: 'A system where designers, photographers and developers can create and display their portfolios in an organized way.',
      tags: ['#creativehub', '#softwareengineer', '#webapp'],
      image_urls: [
        'https://st.depositphotos.com/1002111/1650/i/450/depositphotos_16501773-stock-photo-business-team.jpg',
        'https://st2.depositphotos.com/1258191/8287/i/450/depositphotos_82878128-stock-photo-business-professionals-working-together.jpg',
      ],
      category_id: category.id,
      user_id: user.id,
    })
    .then((res) => {
      expect(res.status).toBe(201);
    });
});

describe('Project creation validation', () => {
  const testTemplate = (newData, errorMessage) => request(app).post(route)
    .set('Authorization', `bearer ${user.token}`)
    .send({
      title: 'CreativeHub',
      description: 'A system where designers, photographers and developers can create and display their portfolios in an organized way.',
      tags: ['#creativehub', '#softwareengineer', '#webapp'],
      image_urls: [
        'https://st.depositphotos.com/1002111/1650/i/450/depositphotos_16501773-stock-photo-business-team.jpg',
        'https://st2.depositphotos.com/1258191/8287/i/450/depositphotos_82878128-stock-photo-business-professionals-working-together.jpg',
      ],
      category_id: category.id,
      user_id: user.id,
      ...newData,
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe(errorMessage);
    });

  test('Test #24 - Insert a project without a title', () => testTemplate({ title: null }, 'Title is required!'));
  test('Test #25 - Insert a project without a description', () => testTemplate({ description: null }, 'Description is required!'));
  test('Test #26 - Insert a project without tags', () => testTemplate({ tags: null }, 'Tags are required!'));
  test('Test #27 - Insert a project without images', () => testTemplate({ image_urls: null }, 'Images are required!'));
});

test('Test #28 - Updating project data', () => app.db('projects')
  .insert({
    title: 'CreativeHub',
    description: 'A system where designers, photographers and developers can create and display their portfolios in an organized way.',
    tags: ['#creativehub', '#softwareengineer', '#webapp'],
    image_urls: [
      'https://st.depositphotos.com/1002111/1650/i/450/depositphotos_16501773-stock-photo-business-team.jpg',
      'https://st2.depositphotos.com/1258191/8287/i/450/depositphotos_82878128-stock-photo-business-professionals-working-together.jpg',
    ],
    category_id: category.id,
    user_id: user.id,
  }, ['id'])
  .then((projectRes) => request(app).put(`${route}/${projectRes[0].id}`)
    .set('Authorization', `bearer ${user.token}`)
    .send({
      title: 'Planify',
      description: 'A web app capable of managing events',
      tags: ['#planify', '#softwareengineer', '#webapp', '#events'],
      image_urls: [
        'https://saffronweddingstyle.com/wp-content/uploads/2023/08/corporate-event-planning.jpg',
        'https://eclipse.global/wp-content/uploads/2018/11/So-Sri-Lanka-CS-2.jpg',
      ],
      category_id: category.id,
      user_id: user.id,
    }))
  .then((res) => {
    expect(res.status).toBe(200);
  }));

test('Test #29 - Deleting an project', async () => {
  const projectDel = await app.db('projects')
    .insert({
      title: 'CreativeHub',
      description: 'A system where designers, photographers and developers can create and display their portfolios in an organized way.',
      tags: ['#creativehub', '#softwareengineer', '#webapp'],
      image_urls: [
        'https://st.depositphotos.com/1002111/1650/i/450/depositphotos_16501773-stock-photo-business-team.jpg',
        'https://st2.depositphotos.com/1258191/8287/i/450/depositphotos_82878128-stock-photo-business-professionals-working-together.jpg',
      ],
      category_id: category.id,
      user_id: user.id,
    }, ['id']);

  const res = await request(app).delete(`${route}/${projectDel[0].id}`)
    .set('Authorization', `bearer ${user.token}`);

  expect(res.status).toBe(204);
});
