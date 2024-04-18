import Group from '#models/group'
import { createTestimonialValidator, updateTestimonialValidator } from '#validators/testimonial'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class TestimonialsController {
  /**
   * Display a list of resource
   */
  async index({ request, params }: HttpContext) {
    const group = await Group.findOrFail(params.group_id)
    let page = Number(request.input('page') || 1)
    if (Number.isNaN(page)) {
      page = 1
    }

    return group.related('testimonials').query().orderBy('id', 'desc').paginate(page)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, params, response }: HttpContext) {
    const group = await Group.findOrFail(params.group_id)
    const payload = await request.validateUsing(createTestimonialValidator)

    if (payload.authorAvatar) {
      await payload.authorAvatar.move(app.tmpPath('/uploads'), {
        name: `${cuid()}.${payload.authorAvatar.extname}`,
      })
    }

    const testimonial = await group.related('testimonials').create({
      authorName: payload.authorName,
      authorRole: payload.authorRole,
      content: payload.content,
      source: 'manual',
      authorAvatarUrl: payload.authorAvatar?.fileName || null,
    })

    return response.created({
      data: testimonial,
    })
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const group = await Group.findOrFail(params.group_id)
    const testimonial = await group
      .related('testimonials')
      .query()
      .where('id', params.id)
      .firstOrFail()

    return {
      data: testimonial,
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const group = await Group.findOrFail(params.group_id)
    const testimonial = await group
      .related('testimonials')
      .query()
      .where('id', params.id)
      .firstOrFail()

    const payload = await request.validateUsing(updateTestimonialValidator)
    testimonial.merge({
      authorName: payload.authorName,
      authorRole: payload.authorRole,
      content: payload.content,
    })

    if (payload.authorAvatar) {
      await payload.authorAvatar.move(app.tmpPath('/uploads'), {
        name: `${cuid()}.${payload.authorAvatar.extname}`,
      })
      testimonial.authorAvatarUrl = payload.authorAvatar?.fileName || null
    }

    await testimonial.save()
    return {
      data: testimonial,
    }
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const group = await Group.findOrFail(params.group_id)
    await group.related('testimonials').query().where('id', params.id).del()
    return {
      deleted: true,
    }
  }
}
