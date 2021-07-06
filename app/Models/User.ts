import { BaseModel, HasOne, column, hasOne, beforeCreate } from '@ioc:Adonis/Lucid/Orm';

import { DateTime } from 'luxon';
import Token from './Token';
import { v4 } from 'uuid';

export default class User extends BaseModel {
	@column({ isPrimary: true })
	public id: string;

	@column()
	public username: string;

	@column()
	public password: string;

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime;

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime;

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public lastLoggedAt: DateTime;

	@hasOne(() => Token, { foreignKey: 'user_id' })
	public token: HasOne<typeof Token>;

	@beforeCreate()
	public static async generateUuid(user: User) {
		user.id = (v4() as string).replace('/-/g', '');
	}
}
