import chai, { expect } from 'chai';

import HttpClient from './HttpClient';
import { StatusCodes } from 'http-status-codes';
import User from 'App/Models/User';
import { UserFactory } from 'Database/factories';
import Utils from 'App/Utils/Utils';
import chaiSubset from 'chai-subset';
import test from 'japa'

chai.use(chaiSubset);

const BASE_URL = Utils.buildServerUrl();

class TestData {
	httpClient: HttpClient = new HttpClient(BASE_URL);
	createdUsers: User[] = [];
}

const testData = new TestData();

test.group('User CRUD', () => {

	test('should get all users', async () => {
		const response = await testData.httpClient.get('/users');
		expect(response.status).to.be.eq(StatusCodes.OK);
	}).timeout(30000);

	test('should create a user', async () => {
		const user = await UserFactory.make();
		const response = await testData.httpClient.post<User>('/users', { username: user.username, password: user.password });
		expect(response.status).to.be.eq(StatusCodes.CREATED);
		expect(response.body).to.containSubset({ username: user.username });
		expect(response.body.createdAt).to.exist;
		expect(response.body.lastLoggedAt).to.exist;
		expect(response.body.updatedAt).to.exist;
		testData.createdUsers.push(response.body);
	}).timeout(0);

	test('should update a user', async () => {
		const response = await testData.httpClient.put<User>(`/users/${testData.createdUsers[0].id}`, { username: "Updated username" });
		expect(response.status).to.be.eq(StatusCodes.OK);
		expect(response.body.username).to.be.eq("Updated username")
	})
	.timeout(0);
})
