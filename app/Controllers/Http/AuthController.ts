import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Logger from '@ioc:Adonis/Core/Logger';
import User from 'App/Models/User';
import UserLoginValidator from 'App/Validators/User/UserLoginValidator';
import UserRegisterValidator from 'App/Validators/Auth/UserRegisterValidator';

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(UserLoginValidator);
      const token = await auth.use('api').attempt(payload.username, payload.password);
			response.ok({ ...token.user.serialize(), token: { token: token.token } });
    } catch (e) {
			response.badRequest();
		}
  }

	public async register({ auth, request, response }: HttpContextContract) {
		try {
			const payload = await request.validate(UserRegisterValidator);
			let user = new User();
			user.username = payload.username;
			user.password = payload.password;
			// Save user
			user = await user.save();
			// Generate new user token
			const token = await auth.use('api').generate(user);
			Logger.info(`User [${user.id} - ${user.username}] created`);
			response.created({ ...user.serialize(), token: { token: token.token } });
		} catch (e) {
			response.badRequest();
		}
	}
}
