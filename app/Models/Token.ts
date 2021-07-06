import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

import { DateTime } from 'luxon';

export default class Token extends BaseModel {
	@column({ isPrimary: true })
	public token: number;

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime;

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public expiresAt: DateTime;
}
