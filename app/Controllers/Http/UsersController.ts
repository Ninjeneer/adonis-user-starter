import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Logger from '@ioc:Adonis/Core/Logger';
import User from 'App/Models/User';
import UserCreateValidator from 'App/Validators/User/UserCreateValidator';
import UserUpdateValidator from 'App/Validators/User/UserUpdateValidator';

export default class UsersController {
	public async index({ request }: HttpContextContract) {
		return await User.all();
	};


	public async store({ request, response, auth }: HttpContextContract) {
		try {
			const payload = await request.validate(UserCreateValidator);
			let user = new User();
			user.username = payload.username;
			user.password = payload.password;
			user = await user.save();
			Logger.info(`User [${user.id} - ${user.username}] created`);
			response.created(user.serialize());
		} catch (e) {
			response.badRequest();
		}
	}

	public async show({ request, response }: HttpContextContract) {
		const user = await User.findBy('id', request.param('id'));
		if (user) {
			response.ok(user);
		} else {
			response.notFound();
		}
	}

	public async update({ request, response }: HttpContextContract) {
		const user = await User.findBy('id', request.param('id'));
		if (user) {
			try {
				const payload = await request.validate(UserUpdateValidator);
				user.username = payload.username;
				// If the password is updated
				if (payload.password) {
					user.password = payload.password;
				}
				user.save();
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
