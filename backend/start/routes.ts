/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import { sep, normalize } from 'node:path'
import app from '@adonisjs/core/services/app'
import router from '@adonisjs/core/services/router'

const GroupsController = () => import('#controllers/groups_controller')
const SessionController = () => import('#controllers/session_controller')
const TestimonialsController = () => import('#controllers/testimonials_controller')

const PATH_TRAVERSAL_REGEX = /(?:^|[\\/])\.\.(?:[\\/]|$)/

router.get('/uploads/*', ({ request, response }) => {
  const filePath = request.param('*').join(sep)
  const normalizedPath = normalize(filePath)

  if (PATH_TRAVERSAL_REGEX.test(normalizedPath)) {
    return response.badRequest('Malformed path')
  }

  const absolutePath = app.tmpPath('uploads', normalizedPath)
  return response.download(absolutePath)
})

router
  .group(() => {
    router.post('login', [SessionController, 'store'])
    router.delete('logout', [SessionController, 'destroy']).use(middleware.auth())
    router.resource('groups', GroupsController).apiOnly().use(['destroy', 'store', 'update'], middleware.auth())
    router
      .resource('groups.testimonials', TestimonialsController)
      .apiOnly()
      .use(['destroy', 'store', 'update'], middleware.auth())
  })
  .prefix('api')
