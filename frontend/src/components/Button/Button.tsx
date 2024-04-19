import s from './Button.module.css'

type Props = {
  children: React.ReactNode
  type?: 'button' | 'submit'
  onClick?: () => void
  disabled?: boolean
}

export const Button = ({
  children,
  type = 'button',
  onClick,
  disabled,
}: Props) => {
  return (
    <button
      type={type}
      className={s.button}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
