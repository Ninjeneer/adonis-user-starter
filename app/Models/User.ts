import { BaseModel, HasOne, beforeCreate, column, hasOne } from '@ioc:Adonis/Lucid/Orm';

import { DateTime } from 'luxon';
import Token from './Token';
import { v4 } from 'uuid';

export default class User extends BaseModel {
	@column({ isPrimary: true })
	public id: string;

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

	@hasOne(() => Token, { foreignKey: 'user_id' })
	public token: HasOne<typeof Token>;

	@beforeCreate()
	public static async generateUuid(user: User) {
		user.id = (v4() as string).replace('/-/g', '');
	}
}
