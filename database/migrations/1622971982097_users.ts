import BaseSchema from '@ioc:Adonis/Lucid/Schema';
import v4 from 'uuid';
export default class Users extends BaseSchema {
  protected tableName = 'users';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(v4());
      table.string('username');
      table.string('password');

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
      table.timestamp('last_logged_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
