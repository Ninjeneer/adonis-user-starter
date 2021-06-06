import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import UserCreateValidator from 'App/Validators/UserCreateValidator';
import UserUpdateValidator from 'App/Validators/UserUpdateValidator';

export default class UsersController {
  public async index({}: HttpContextContract) {
    return User.all();
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(UserCreateValidator);
      let user = new User();
      user.username = payload.username;
      user.password = payload.password;
      user = await user.save();
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

  public async edit({}: HttpContextContract) {}

  public async update({ request, response }: HttpContextContract) {
    const user = await User.findBy('id', request.param('id'));
    if (user) {
      try {
        const payload = await request.validate(UserUpdateValidator);
        user.username = payload.username;
        user.password = payload.password;
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
      response.ok(user);
    } else {
      response.notFound();
    }
  }
}
