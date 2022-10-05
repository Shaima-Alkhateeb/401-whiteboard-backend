'use strict';

const supertest = require('supertest');
const server = require('../server');
const request = supertest(server.app);

const { db } = require('../models/index');
// jest.setTimeout(5000);

beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});

describe('Test user comment routes', () => {
  it('All comments', async () => {
    // setTimeout(() => {
    const res = await request.get('/comment');
    expect(res.status).toEqual(200);
    // }, 1000);
  }, 1000);

  it('One comment', async () => {
    const res = await request.get('/comment/1');
    expect(res.status).toEqual(200);
    // expect(typeof res.body).toEqual('object');//('object');
  }, 1000);

  it('Create new comment', async () => {
    setTimeout(() => {
      const res = request.post('/comment').send({
        comment: 'test',
        post_id: 1,
        name: 'Shaima',
        user_id: 1
      });
      expect(res.status).toEqual(201);
    }, 1000);
  });


  // it('Create comment', async () => {
  //   // setTimeout(() => {
  //     const res = await request.post('/comment/2/2');
  //     expect(res.status).toEqual(201);
  //   // }, 1000);
  // }, 1000);

  it('Update comment', async () => {
    setTimeout(() => {
      const res = request.put('/comment/1').send({ comment: 'test',post_id: 1, name: 'Shaima',user_id: 1 });
      expect(res.status).toEqual(200);
    // }, 1000);
    }, 1000);
  });

  it('Delete comment', async () => {
    setTimeout(() => {
      const res = request.delete('/comment/1');
      expect(res.status).toEqual(204);
    // }, 1000);
    // const res = await request.delete('/comment/2');
    // expect(res.status).toEqual(204);
    }, 1000);
  });


});
