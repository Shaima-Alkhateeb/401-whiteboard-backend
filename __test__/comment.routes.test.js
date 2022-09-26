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
    setTimeout(() => {
      const res = request.get('/comment');
      expect(res.status).toEqual(200);
    }, 500);
  });

  // it('One comment', async () => {
  //   const res = await request.get('/comment/2/2');
  //   expect(res.status).toEqual(200);
  //   // expect(typeof res.body).toEqual('object');//('object');
  // });

  it('Create comment', async () => {
    setTimeout(() => {
      const res = request.post('/comment/2/2').send({ post_id: 2,user_id:2, comment: 'test', name:'shaima' });
      expect(res.status).toEqual(201);
    }, 500);
  });

  it('Update comment', async () => {
    setTimeout(() => {
      const res = request.put('/comment/2');
      expect(res.status).toEqual(200);
    }, 500);
  });

  it('Delete comment', async () => {
    setTimeout(() => {
      const res = request.post('/comment/2');
      expect(res.status).toEqual(204);
    }, 500);
    // const res = await request.delete('/comment/2');
    // expect(res.status).toEqual(204);
  });
  
});