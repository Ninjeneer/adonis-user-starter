import { BaseModel, BelongsTo, HasOne, belongsTo, column, hasOne } from '@ioc:Adonis/Lucid/Orm';

import { DateTime } from 'luxon';
import User from './User';

export default class ApiToken extends BaseModel {
	@column({ isPrimary: true })
	public id: number;

	@column()
	public name: string;

	@column()
	public type: string;

	@column()
	public token: string;

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime;

	@column.dateTime()
	public expiresAt: DateTime;

	@belongsTo(() => User)
	public user: BelongsTo<typeof User>;

}
