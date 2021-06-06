import Utils from 'App/Utils/Utils';
import { expect } from 'chai';
import test from 'japa';
import supertest from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { UserFactory } from 'Database/factories';


const BASE_URL = Utils.buildServerUrl();

test.group('User CRUD', () => {
  test('should get all users', async () => {
    const response = await supertest(BASE_URL).get('/users');
    expect(response.status).to.be.eq(StatusCodes.OK);
  });

  test('should create a user', async () => {
    const user = UserFactory.create();
    const response = await supertest(BASE_URL).post('/users').send(user);
    expect(response.status).to.be.eq(StatusCodes.CREATED);
  });
})
