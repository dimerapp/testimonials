import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  async store({ request, response, auth }: HttpContext) {
    const user = await User.verifyCredentials(request.input('email'), request.input('password'))
    await auth.use('web').login(user)

    response.created({
      loggedIn: true,
    })
  }

  async destroy({ auth }: HttpContext) {
    await auth.use('web').logout()
    return {
      loggedOut: true,
    }
  }
}
