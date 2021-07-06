import chai, { expect } from 'chai';

import { StatusCodes } from 'http-status-codes';
import { UserFactory } from 'Database/factories';
import Utils from 'App/Utils/Utils';
import chaiSubset from 'chai-subset';
import supertest from 'supertest';
import test from 'japa';
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
});
