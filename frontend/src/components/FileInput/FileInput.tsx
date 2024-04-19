import s from './FileInput.module.css'

type Props = {
  name: string
  label: string
  formMethods: any,
  required?: boolean
}

export const FileInput = ({
  name,
  label,
  formMethods,
  required = false,
}: Props) => {
  const {
    register,
    formState: { errors },
    watch,
  } = formMethods

  const value = watch(name)

  return (
    <div>
      <label>
        <span className={s.label}>
          {label}
          {required && <span className={s.asterisk}>*</span>}
        </span>
        <div className={s.inputWrapper}>
          <input
            className={s.input}
            type="file"
            accept="image/png, image/jpeg"
            {...register(name, { required })}
          />
          <div className={s.visualInput}>
            {(value && value[0]) ? (
              <span>{value[0].name}</span>
            ) : (
              <span className={s.visualBtn}>Choose file</span>
            )}

          </div>
        </div>
      </label>
      {errors[name] && <div className={s.error}>
        This field is required
      </div>}
    </div>
  )
}
