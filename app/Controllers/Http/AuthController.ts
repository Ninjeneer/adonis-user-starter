import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import UserLoginValidator from 'App/Validators/UserLoginValidator';

export default class AuthController {
  public async login({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(UserLoginValidator);
      const user = await User.query().where('username', payload.username).andWhere('password', payload.password).first();
    }
  }
}
