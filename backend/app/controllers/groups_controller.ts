import Group from '#models/group'
import type { HttpContext } from '@adonisjs/core/http'
import { createGroupValidator, updateGroupValidator } from '#validators/group'

export default class GroupsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return {
      data: await Group.all(),
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const group = await Group.create(await request.validateUsing(createGroupValidator))
    return response.created({
      data: group,
    })
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const group = await Group.findOrFail(params.id)
    return {
      data: group,
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const group = await Group.findOrFail(params.id)
    const payload = await request.validateUsing(updateGroupValidator)
    group.name = payload.name
    return {
      data: group,
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, request, response }: HttpContext) {
    const group = await Group.findOrFail(params.id)
    const payload = await request.validateUsing(updateGroupValidator)
    if (group.name === payload.name) {
      await group.delete()
      return {
        deleted: true,
      }
    }

    response.badRequest({
      errors: [
        {
          message: 'Name mis-match. Cannot delete group',
        },
      ],
    })
  }
}
