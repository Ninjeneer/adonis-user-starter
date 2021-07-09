// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import ApiToken from "App/Models/ApiToken";

export default class TokensController {
	public async index() {
		return await ApiToken.all();
	}
}
