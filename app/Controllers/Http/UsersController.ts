import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Logger from '@ioc:Adonis/Core/Logger';
import User from 'App/Models/User';
import UserCreateValidator from 'App/Validators/UserCreateValidator';
import UserUpdateValidator from 'App/Validators/UserUpdateValidator';

export default class UsersController {
  public async index({}: HttpContextContract) {
    return User.all();
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(UserCreateValidator);
      let user = new User();
      user.username = payload.username;
      user.password = payload.password;
      user = await user.save();
      Logger.info(`User [${user.id} - ${user.username}] created`);
      response.created(user);
    } catch (e) {
      response.badRequest();
    }
  }

  public async show({ request, response }: HttpContextContract) {
    const id = request.param('id');
    if (!id) {
      response.badRequest();
    }
    return await User.findBy('id', id);
  }

  public async update({ request, response }: HttpContextContract) {
    const user = await User.findBy('id', request.param('id'));
    if (user) {
      try {
        const payload = await request.validate(UserUpdateValidator);
        user.username = payload.username;
        user.password = payload.password;
        Logger.info(`User [${user.id} - ${user.username}] updated`);
        response.ok(user);
      } catch (e) {
        response.badRequest();
      }
    } else {
      response.notFound();
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    const user = await User.findBy('id', request.param('id'));
    if (user) {
      await user.delete();
      Logger.info(`User [${user.id} - ${user.username}] deleted`);
      response.ok(user);
    } else {
      response.notFound();
    }
  }
}
