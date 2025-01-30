const request = require('supertest');
const jwt = require('jwt-simple');
const uuid = require('uuid');
const app = require('../../src/app');

const route = '/passwordrecovery';
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

test('Test #17 - Send password reset email for existing user', async () => {
  await request(app).post(`${route}/reset-password`)
    .send({ email: user.email })
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Password reset email sent');
    });
});

test('Test #18 - Attempt to reset password for non-existent user', () => {
  return request(app).post(`${route}/reset-password`)
    .send({ email: 'nonexistent@example.com' })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('User not found');
    });
});

test('Test #19 - Attempt to change password with invalid token', () => {
  return request(app).put(`${route}/change-password`)
    .send({
      token: 'invalid-token',
      newPassword: 'NewPass@123',
      confirmNewPassword: 'NewPass@123',
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Invalid or expired token');
    });
});

test('Test #20 - Attempt to change password with expired token', async () => {
  const expiredToken = 'expiredtoken123';

  await app.db('passwordresettoken').insert({
    token: expiredToken,
    expirydate: new Date(Date.now() - 3600000),
    user_id: user.id,
  });

  return request(app).put(`${route}/change-password`)
    .send({
      token: expiredToken,
      newPassword: 'NewPass@123',
      confirmNewPassword: 'NewPass@123',
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Invalid or expired token');
    });
});

test('Test #21 - Attempt to change password with mismatched passwords', async () => {
  const validToken = 'validtoken123';

  await app.db('passwordresettoken').insert({
    token: validToken,
    expirydate: new Date(Date.now() + 3600000),
    user_id: user.id,
  });

  return request(app).put(`${route}/change-password`)
    .send({
      token: validToken,
      newPassword: 'NewPass@123',
      confirmNewPassword: 'WrongPass@123',
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Passwords do not match');
    });
});

test('Test #22 - Successfully change password with valid token', async () => {
  const validToken = 'validtoken456';

  await app.db('passwordresettoken').insert({
    token: validToken,
    expirydate: new Date(Date.now() + 3600000),
    user_id: user.id,
  });

  return request(app).put(`${route}/change-password`)
    .send({
      token: validToken,
      newPassword: 'New@Pass-123',
      confirmNewPassword: 'New@Pass-123',
    })
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Password changed successfully');
    });
});
