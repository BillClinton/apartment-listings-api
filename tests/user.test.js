const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { userOneId, userOne, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should create a new user', async () => {
  const response = await request(app)
    .post('/users')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: 'Test',
      surname: 'User',
      email: 'test@email.com',
      password: 'MyPass777!'
    })
    .expect(201);

  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  expect(response.body).toMatchObject({
    user: {
      name: 'Test',
      surname: 'User',
      email: 'test@email.com'
    }
  });

  expect(user.password).not.toBe('MyPass777!');
});

test('Should log in existing user', async () => {
  const response = await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: userOne.password
    })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user).not.toBeNull();

  // Expect token returned to match the user's second token
  expect(response.body.token).toBe(user.tokens[1].token);
});

test('Should not log in nonexistant user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: 'Fred@gmail.com',
      password: 'password123!'
    })
    .expect(400);
});

test('Should get all users', async () => {
  await request(app)
    .get('/users')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('Should get profile for current user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('Should not get current profile for unauthenticated user', async () => {
  await request(app)
    .get('/users/me')
    .send()
    .expect(401);
});

test('Should get profile for user', async () => {
  await request(app)
    .get(`/users/${userOneId}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('Should not get profile for unauthenticated user', async () => {
  console.log(`/users/${userOneId}`);
  await request(app)
    .get(`/users/${userOneId}`)
    .send()
    .expect(401);
});

test('Should update user', async () => {
  await request(app)
    .patch(`/users/${userOneId}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: 'John',
      email: 'test456@email.com'
    })
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user.name).toBe('John');
  expect(user.email).toBe('test456@email.com');
});

test('Should not update invalid user fields', async () => {
  await request(app)
    .patch(`/users/${userOneId}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: 'Philly'
    })
    .expect(400);
});

test('Should not update user for unauthenticated user', async () => {
  await request(app)
    .patch(`/users/${userOneId}`)
    .send({
      name: 'John'
    })
    .expect(401);
});

test('Should delete user profile', async () => {
  await request(app)
    .delete(`/users/${userOneId}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('Should not delete user for unauthenticated user', async () => {
  await request(app)
    .delete(`/users/${userOneId}`)
    .send()
    .expect(401);
});
