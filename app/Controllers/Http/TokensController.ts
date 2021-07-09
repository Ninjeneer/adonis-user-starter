import ApiToken from "App/Models/ApiToken";
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TokensController {
	public async index() {
		return await ApiToken.all();
	}

	public async revoke({ request, response }: HttpContextContract) {
		const token = await ApiToken.findBy('token', request.param('token'));
		if (token) {
			token.delete();
			response.ok({});
		} else {
			response.notFound();
		}
	}
}
