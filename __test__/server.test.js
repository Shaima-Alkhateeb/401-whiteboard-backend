'use strict';

const supertest = require('supertest');
const server = require('../server');
const request = supertest(server.app);


describe('API server', () => {
  it('Home page works', async () => {
    const res = await request.get('/');
    // expect(res.status).toEqual(200);
    expect(res.text).toEqual('\"Testing Home page\"');
  });
});
