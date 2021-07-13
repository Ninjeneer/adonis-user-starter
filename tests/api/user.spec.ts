import chai, { expect } from 'chai';
import test, { group } from 'japa'

import HttpClient from './HttpClient';
import { StatusCodes } from 'http-status-codes';
import User from 'App/Models/User';
import { UserFactory } from 'Database/factories';
import Utils from 'App/Utils/Utils';
import chaiSubset from 'chai-subset';
import getPort from 'get-port';

chai.use(chaiSubset);
class TestData {
	httpClient: HttpClient;
	currentUser: User;
	createdUsers: User[] = [];

	constructor(url: string) {
		this.httpClient = new HttpClient(url);
	}
}


test.group('User tests', async (group) => {

	const BASE_URL = Utils.buildServerUrl({ port: await getPort() });
	const testData = new TestData(BASE_URL);

	group.after(async () => {
		for (const user of testData.createdUsers) {
			await testData.httpClient.delete<User>(`/users/${user.id}`);
		}
		await testData.httpClient.delete<User>(`/users/${testData.currentUser.id}`);
	});

	test.group('User Authentication', () => {
		let password = ""
		test('should register a user', async () => {
			const user = await UserFactory.make();
			password = user.password;
			const response = await testData.httpClient.post<User>('/auth/register', { username: user.username, password: user.password });
			expect(response.status).to.be.eq(StatusCodes.CREATED);
			expect(response.body.createdAt).to.exist;
			expect(response.body.lastLoggedAt).to.exist;
			expect(response.body.updatedAt).to.exist;
			expect(response.body.password).to.not.exist;
			expect(response.body.token).to.exist;
			testData.httpClient.setToken(response.body.token.token);
			testData.currentUser = response.body;
		}).timeout(0);

		test('should login a user', async () => {
			const response = await testData.httpClient.post<User>('/auth/login', { username: testData.currentUser.username, password });
			expect(response.status).to.be.eq(StatusCodes.OK);
			expect(response.body.createdAt).to.exist;
			expect(response.body.lastLoggedAt).to.exist;
			expect(response.body.updatedAt).to.exist;
			expect(response.body.password).to.not.exist;
			expect(response.body.token).to.exist;
			testData.httpClient.setToken(response.body.token.token);
			testData.currentUser = response.body;
		}).timeout(0);
	})

	test.group('User CRUD', () => {
		test.group('Success cases', () => {
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
				expect(response.body.token).to.not.exist;
				testData.createdUsers.push(response.body);
			}).timeout(0);

			test('should update a user', async () => {
				const response = await testData.httpClient.put<User>(`/users/${testData.createdUsers[0].id}`, { username: "Updated username" });
				expect(response.status).to.be.eq(StatusCodes.OK);
				expect(response.body.username).to.be.eq("Updated username")
				testData.createdUsers[0] = response.body;
			}).timeout(0);

			test('should get a user', async () => {
				const response = await testData.httpClient.get<User>(`/users/${testData.createdUsers[0].id}`);
				expect(response.status).to.be.eq(StatusCodes.OK);
				expect(response.body).to.be.deep.eq(testData.createdUsers[0])
			}).timeout(0);

			test('should delete a user', async () => {
				let response = await testData.httpClient.delete<User>(`/users/${testData.createdUsers[0].id}`);
				expect(response.status).to.be.eq(StatusCodes.OK);
				expect(response.body).to.be.deep.eq(testData.createdUsers[0])

				response = await testData.httpClient.get<User>(`/users/${testData.createdUsers[0].id}`);
				expect(response.status).to.be.eq(StatusCodes.NOT_FOUND);
			}).timeout(0);
		})

		test.group('Error cases', () => {
			test('should not be allowed to get all users', async () => {
				const response = await testData.httpClient.withoutToken().get('/users');
				expect(response.status).to.be.eq(StatusCodes.UNAUTHORIZED);
			}).timeout(0);

			test('should not be allowed to create a user', async () => {
				const user = await UserFactory.make();
				const response = await testData.httpClient.withoutToken().post<User>('/users', { username: user.username, password: user.password });
				expect(response.status).to.be.eq(StatusCodes.UNAUTHORIZED);
			}).timeout(0);

			test('should not be allowed to update a user', async () => {
				const response = await testData.httpClient.withoutToken().put<User>(`/users/${testData.createdUsers[0].id}`, { username: "Updated username" });
				expect(response.status).to.be.eq(StatusCodes.UNAUTHORIZED);
				testData.createdUsers[0] = response.body;
			}).timeout(0);

			test('should not be allowed to get a user', async () => {
				const response = await testData.httpClient.withoutToken().get<User>(`/users/${testData.createdUsers[0].id}`);
				expect(response.status).to.be.eq(StatusCodes.UNAUTHORIZED);
			}).timeout(0);

			test('should not be allowed to delete a user', async () => {
				let response = await testData.httpClient.withoutToken().delete<User>(`/users/${testData.createdUsers[0].id}`);
				expect(response.status).to.be.eq(StatusCodes.UNAUTHORIZED);
			}).timeout(0);
		});
	});
});
