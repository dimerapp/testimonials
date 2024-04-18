import vine from '@vinejs/vine'

/**
 * Validator to validate the payload when creating
 * a new group.
 */
export const createGroupValidator = vine.compile(
  vine.object({
    name: vine.string(),
  })
)

/**
 * Validator to validate the payload when updating
 * an existing group.
 */
export const updateGroupValidator = vine.compile(
  vine.object({
    name: vine.string(),
  })
)
