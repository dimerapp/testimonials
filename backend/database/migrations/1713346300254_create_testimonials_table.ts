import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'testimonials'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('group_id').notNullable().unsigned().references('id').inTable('groups')
      table.string('author_name').notNullable()
      table.string('author_role').nullable()
      table.string('author_avatar_url').nullable()
      table.text('content', 'longtext').notNullable()
      table.string('source').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
