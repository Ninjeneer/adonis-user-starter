import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Tokens extends BaseSchema {
  protected tableName = 'tokens';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('token').primary();
      table.string('user_id');
      table
        .foreign('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true });
      table.timestamp('expires_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
