'use strict';

const supertest = require('supertest');
const server = require('../server');
const request = supertest(server.app);

describe('Test the returned data for each REST route', () => {
  it('All post', async () => {
    const res = await request.get('/post');
    expect(res.status).toEqual(200);
  });

  it('One post', async () => {
    const res = await request.get('/post/1');
    expect(res.status).toEqual(200);
    expect(typeof res.body).toEqual(
      '{"id":1,"title":"title1","description":"description1","status":"status1","email":"email1","createdAt":"2022-09-12T14:53:30.867Z","updatedAt":"2022-09-12T14:53:30.867Z"}'
    );
  });

  it('Create post', async () => {
    const res = await request
      .post('/post')
      .send({ title: 'test', content: 'test' });
    expect(res.status).toEqual(201);
  });

  it('Update post', async () => {
    const res = await request
      .put('/post/1')
      .send({ title: 'test', content: 'test' });
    expect(res.status).toEqual(200);
  });

  it('Delete post', async () => {
    const res = await request.delete('/post/1');
    expect(res.status).toEqual(204);
  });
});
