import Utils from 'App/Utils/Utils';
import chai, { expect } from 'chai';
import test from 'japa';
import supertest from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { UserFactory } from 'Database/factories';
import chaiSubset from 'chai-subset';
chai.use(chaiSubset);


const BASE_URL = Utils.buildServerUrl();

test.group('User CRUD', () => {
  test('should get all users', async () => {
    const response = await supertest(BASE_URL).get('/users');
    expect(response.status).to.be.eq(StatusCodes.OK);
  });

  test('should create a user', async () => {
    const user = await UserFactory.make();
    const response = await supertest(BASE_URL).post('/users').send({ username: user.username, password: user.password });
    expect(response.status).to.be.eq(StatusCodes.CREATED);
    expect(response.body).to.containSubset({ username: user.username, password: user.password });
  });
})
