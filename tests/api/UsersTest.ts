import 'mocha';

import HttpClient from './HttpClient';
import { StatusCodes } from 'http-status-codes';
import User from 'App/Models/User';
import { UserFactory } from 'Database/factories';
import Utils from 'App/Utils/Utils';
import chaiSubset from 'chai-subset';
import { expect } from 'chai';

chai.use(chaiSubset);
const httpClient = new HttpClient();
let createdUser: User;

describe('Users API', function () {
  describe('CRUD operations', function () {
    it('Should create a user', async function () {
      const user = UserFactory.create();
      const response = await httpClient.post<User>(`${Utils.buildServerUrl()}/users`, user);
      expect(response.status).to.be.eq(StatusCodes.OK);
      expect(response.data).to.containSubset(user);
      createdUser = response.data;
    });

    it('Should get a user', async function () {
      const response = await httpClient.get<User>(
        `${Utils.buildServerUrl()}/users/${createdUser.id}`
      );
      expect(response.status).to.be.eq(StatusCodes.OK);
      expect(response.data).to.containSubset(createdUser);
    });

    it('Should get update a user', async function () {
      const newUser = UserFactory.create();
      const response = await httpClient.put<User>(
        `${Utils.buildServerUrl()}/users/${createdUser.id}`,
        newUser
      );
      expect(response.status).to.be.eq(StatusCodes.OK);
      expect(response.data).to.containSubset(newUser);
    });

    it('Should delete a user', async function () {
      let response = await httpClient.delete<User>(
        `${Utils.buildServerUrl()}/users/${createdUser.id}`
      );
      expect(response.status).to.be.eq(StatusCodes.OK);
      response = await httpClient.get<User>(`${Utils.buildServerUrl()}/users/${createdUser.id}`);
      expect(response.status).to.be.eq(StatusCodes.NOT_FOUND);
    });
  });
});
