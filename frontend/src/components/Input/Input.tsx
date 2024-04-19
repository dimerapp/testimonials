import s from './Input.module.css'

type Props = {
  name: string
  label: string
  formMethods: any,
  type?: 'text' | 'password' | 'email' | 'file'
  autoFocus?: boolean
  required?: boolean
  multiline?: boolean
}

export const Input = ({
  name,
  label,
  formMethods,
  type = 'text',
  autoFocus = false,
  required = false,
  multiline = false,
}: Props) => {
  const {
    register,
    formState: { errors },
  } = formMethods

  return (
    <div>
      <label>
        <span className={s.label}>
          {label}
          {required && <span className={s.asterisk}>*</span>}
        </span>
        {multiline ? (
          <textarea
            className={s.input}
            autoFocus={autoFocus}
            rows={10}
            cols={60}
            {...register(name, { required })}
          />
        ) : (
          <input
            className={s.input}
            type={type}
            autoFocus={autoFocus}
            {...register(name, { required })}
          />
        )}
      </label>
      {errors[name] && <div className={s.error}>
        This field is required
      </div>}
    </div>
  )
}
