'use strict';

const supertest = require('supertest');
const server = require('../server');
const request = supertest(server.app);
// jest.setTimeout(10000);

const { db } = require('../models/index');

beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});

describe('Test user comment routes', () => {
  it('All comments', async () => {
    const res = await request.get('/comment');
    expect(res.status).toEqual(200);
});

  it('One comment', async () => {
    const res = await request.get('/comment/1');
    expect(res.status).toEqual(200);
    // expect(typeof res.body).toEqual('object');//('object');
  });

  it('Create comment', async () => {
    const res = await request.post('/comment').send({ title: 'test', content: 'test' });
    expect(res.status).toEqual(201);
  });

  it('Update comment', async () => {
    const res = await request.put('/comment/1').send({ title: 'test', content: 'test' });
    expect(res.status).toEqual(200);
  });

  it('Delete comment', async () => {
    const res = await request.delete('/comment/1');
    expect(res.status).toEqual(204);
  });
});

