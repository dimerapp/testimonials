import { DateTime } from 'luxon'
import env from '#start/env'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Testimonial extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare groupId: number

  @column()
  declare authorName: string

  @column()
  declare authorRole: string | null

  @column({
    serialize(value: string | null) {
      return value ? `${env.get('APP_URL')}/uploads/${value}` : value
    },
  })
  declare authorAvatarUrl: string | null

  @column()
  declare content: string

  @column()
  declare source: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
