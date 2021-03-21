import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Geoms extends BaseSchema {
  protected tableName = 'geoms'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('user_id').unsigned().notNullable()
      table.string('content', 2000).notNullable()
      table.timestamps(true)

      table.foreign('user_id').references('id').inTable('users')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
