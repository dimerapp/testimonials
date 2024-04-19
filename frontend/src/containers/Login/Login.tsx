import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { Input } from '../../components/Input/Input'
import { Button } from '../../components/Button/Button'
import s from './Login.module.css'

type FormData = {
  email: string
  password: string
}

export const Login = () => {
  const formMethods = useForm<FormData>()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data: FormData) => {
    axios.post('/api/login', data)
    setIsLoading(true)
    const response = await axios.post('/api/login', data)
    setIsLoading(false)
    if (response.status === 201) {
      navigate(`/groups/${localStorage.getItem('group_id')}/testimonials`)
    }
  }

  return (
    <div className={s.wrapper}>
      <svg width={24} viewBox="0 0 42 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 1a1 1 0 0 1 1-1h23c8.423 0 15 4.22 15 13.5v21C42 43.907 35.423 48 27 48H4a1 1 0 0 1-1-1V1Z" fill="#6142D2" /><path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 1a1 1 0 0 1 1-1h14c8.423 0 15 4.22 15 13.5v21c0 9.407-6.577 13.5-15 13.5h-14a1 1 0 0 1-1-1V1Z" fill="#461C7C" /><path fill-rule="evenodd" clip-rule="evenodd" d="M0 1a1 1 0 0 1 1-1h5c8.423 0 15 4.22 15 13.5v21C21 43.907 14.423 48 6 48H1a1 1 0 0 1-1-1V1Z" fill="#02E2FF" /></svg>
      <form className={s.form} onSubmit={formMethods.handleSubmit(onSubmit)}>
        <Input name="email" label="Email" formMethods={formMethods} required />
        <Input name="password" type="password" label="Password" formMethods={formMethods} required />
        <div className={s.saveButton}>
          <Button type="submit" disabled={isLoading}>Login</Button>
        </div>
      </form>
    </div>
  )
}
