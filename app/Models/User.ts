import { BaseModel, HasOne, beforeCreate, column, hasOne } from '@ioc:Adonis/Lucid/Orm';

import ApiToken from './ApiToken';
import { DateTime } from 'luxon';
import Hash from '@ioc:Adonis/Core/Hash'
import { v4 } from 'uuid';

export default class User extends BaseModel {
	@column({ isPrimary: true })
	public id: string;

	@column()
	public email: string;

	@column()
	public firstname: string;

	@column()
	public lastname: string;

	@column()
	public username: string;

	@column({ serializeAs: null })
	public password: string;

	@column.dateTime({ autoCreate: true, serializeAs: 'createdAt' })
	public createdAt: DateTime;

	@column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: 'updatedAt' })
	public updatedAt: DateTime;

	@column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: 'lastLoggedAt' })
	public lastLoggedAt: DateTime;

	@hasOne(() => ApiToken, { foreignKey: 'user_id' })
	public token: HasOne<typeof ApiToken>;

	@beforeCreate()
	public static async generateUuid(user: User) {
		user.id = (v4() as string).replace('/-/g', '');
	}

	@beforeCreate()
	public static async hashPassword(user: User) {
		if (user.$dirty.password) {
			user.password = await Hash.make(user.password);
		}
	}
}
