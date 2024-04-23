import s from './Placeholder.module.css'

export const Placeholder = () => {
  return (
    <div className={s.container}>
      <div className={s.avatar} />
      <h4 className={s.name} />
      <h5 className={s.role} />
      <p className={s.content} />
    </div>
  )
}
