import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class ApiTokens extends BaseSchema {
	protected tableName = 'api_tokens';

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.string('token', 64).notNullable().unique().primary();
			table.uuid('user_id');
			table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
			table.string('name').notNullable();
			table.string('type').notNullable();

			/**
			 * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
			 */
			table.timestamp('expires_at', { useTz: true }).nullable();
			table.timestamp('created_at', { useTz: true }).notNullable();
		});
	}

	public async down() {
		this.schema.dropTable(this.tableName);
	}
}
