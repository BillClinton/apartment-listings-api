const request = require('supertest');
const app = require('../src/app');
const Apartment = require('../src/models/apartment');
const { userOne, apartmentOneId, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should create a new apartment', async () => {
  const response = await request(app)
    .post('/apartments')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: 'Large Rehabbed 3 Bedroom House in Northern Liberties',
      address: '944 N American St, Philadelphia Pa, 19130',
      rent: 2350,
      bedrooms: 3,
      bathrooms: 2,
      contact: '267-123-4567',
      available: 'Novemeber 15'
    })
    .expect(201);

  const apartment = await Apartment.findById(response.body.apartment._id);
  expect(apartment).not.toBeNull();

  expect(response.body).toMatchObject({
    apartment: {
      name: 'Large Rehabbed 3 Bedroom House in Northern Liberties',
      address: '944 N American St, Philadelphia Pa, 19130',
      rent: 2350,
      bedrooms: 3,
      bathrooms: 2,
      contact: '267-123-4567',
      available: 'Novemeber 15'
    }
  });
});

test('Should get all apartments', async () => {
  await request(app)
    .get('/apartments')
    .send()
    .expect(200);
});

test('Should get an apartment', async () => {
  await request(app)
    .get(`/apartments/${apartmentOneId}`)
    .send()
    .expect(200);
});

test('Should update apartment', async () => {
  await request(app)
    .patch(`/apartments/${apartmentOneId}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      rent: 2300,
      available: 'December'
    })
    .expect(200);
  const apartment = await Apartment.findById(apartmentOneId);
  expect(apartment.rent).toBe(2300);
  expect(apartment.available).toBe('December');
});

test('Should not update invalid apartment fields', async () => {
  await request(app)
    .patch(`/apartments/${apartmentOneId}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: 'Philly'
    })
    .expect(400);
});

test('Should not update apartment for unauthenticated user', async () => {
  await request(app)
    .patch(`/apartments/${apartmentOneId}`)
    .send({
      bedrooms: 3
    })
    .expect(401);
});

test('Should delete apartment', async () => {
  await request(app)
    .delete(`/apartments/${apartmentOneId}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('Should not delete apartment for unauthenticated user', async () => {
  await request(app)
    .delete(`/apartments/${apartmentOneId}`)
    .send()
    .expect(401);
});
