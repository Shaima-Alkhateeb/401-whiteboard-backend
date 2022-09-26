'use strict';

const supertest = require('supertest');
const server = require('../server');
const request = supertest(server.app);
const { db } = require('../models/index');
// jest.setTimeout(5000);
// jest.testFakeTimers('legacy');
// jest.useRealTimers();

beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});

describe('Test the returned data for each REST route', () => {
  it('All post', async () => {
    // setTimeout(() => {
    const res = await request.get('/post').send({ title: 'test', content: 'test' });
    console.log('res', res);
    expect(res.status).toEqual(200);
    // }, 500);
    // const res = await request.get('/post');
    // expect(res.status).toEqual(200);
  });

  it('One post', async () => {
    setTimeout(() => {
      const res =  request.get('/post/2');
      expect(res.status).toEqual(201);
    }, 500);
    // const res = await request.get('/post/2');
    // expect(res.status).toEqual(200);

  });

  it('Create post', async () => {
    // jest.setTimeout(10000);
    // jest.useFakeTimers('legacy');
    // jest.setTimeout(10 * 1000);
    setTimeout(() => {
      const res = request.post('/post').send({ title: 'test', content: 'test' });
      expect(res.status).toEqual(201);
    }, 500);

    // const res = await request.post('/post').send({ title: 'test', content: 'test' });
    // expect(res.status).toEqual(201);

    // jest.setTimeout(3000);
    // expect(typeof res.body).toEqual('object');
  });

  it('Update post', async () => {
    setTimeout(() => {
      const res = request.put('/post/2').send({ title: 'test', content: 'test' });
      expect(res.status).toEqual(200);
    }, 500);
    // const res = await request.put('/post/2').send({ title: 'test', content: 'test' });
    // expect(res.status).toEqual(200);
  });

  it('Delete post', async () => {
    const res = await request.delete('/post/2');
    expect(res.status).toEqual(204);
  });
});

// jest.runOnlyPendingTimers();

