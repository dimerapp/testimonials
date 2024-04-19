import axios from 'axios'

import { Header } from '../Header/Header'
import s from './Body.module.css'

type Props = {
  children: React.ReactNode
}

axios.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response.status === 401) {
    window.location.replace('/login')
  }
  return error
})

export const Body = ({
  children
}: Props) => {
  return (
    <div className={s.container}>
      <Header />
      <div className={s.wrapper}>
        {children}
      </div>
    </div>
  )
}
