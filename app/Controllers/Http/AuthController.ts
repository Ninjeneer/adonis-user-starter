import AuthLoginValidator from 'App/Validators/Auth/AuthLoginValidator';
import AuthRegisterValidator from 'App/Validators/Auth/AuthRegisterValidator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Logger from '@ioc:Adonis/Core/Logger';
import User from 'App/Models/User';

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(AuthLoginValidator);
      const token = await auth.use('api').attempt(payload.username, payload.password);
			response.ok({ ...token.user.serialize(), token: { token: token.token } });
    } catch (e) {
			response.badRequest();
		}
  }

	public async register({ auth, request, response }: HttpContextContract) {
		try {
			const payload = await request.validate(AuthRegisterValidator);
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
