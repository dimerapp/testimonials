import vine from '@vinejs/vine'

/**
 * Validator to validate the payload when creating
 * a new testimonial.
 */
export const createTestimonialValidator = vine.compile(
  vine.object({
    authorName: vine.string(),
    authorRole: vine.string().nullable(),
    content: vine.string(),
    authorAvatar: vine
      .file({
        extnames: ['jpg', 'jpeg', 'png'],
        size: '2mb',
      })
      .nullable(),
  })
)

/**
 * Validator to validate the payload when updating
 * an existing testimonial.
 */
export const updateTestimonialValidator = vine.compile(
  vine.object({
    authorName: vine.string(),
    authorRole: vine.string().nullable(),
    content: vine.string(),
    authorAvatar: vine
      .file({
        extnames: ['jpg', 'jpeg', 'png'],
        size: '2mb',
      })
      .optional(),
  })
)
