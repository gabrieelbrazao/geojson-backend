import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, beforeSave, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Geom from 'App/Models/Geom'
import { v4 as uuid } from 'uuid'
import Hash from '@ioc:Adonis/Core/Hash'
import type { HasMany } from '@ioc:Adonis/Lucid/Relations'

export default class User extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @hasMany(() => Geom, {
    foreignKey: 'user_id',
  })
  public geoms: HasMany<typeof Geom>

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public password_hash: string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @beforeCreate()
  public static assignUuid(user: User) {
    user.id = uuid()
  }

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password_hash) user.password_hash = await Hash.make(user.password_hash)
  }
}
