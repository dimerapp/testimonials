import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.firstOrCreate(
      {
        email: 'pablo@plug.app',
      },
      {
        password: 'secret',
        fullName: 'Pablo Singh',
      }
    )
  }
}
