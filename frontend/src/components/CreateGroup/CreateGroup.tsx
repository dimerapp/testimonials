import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import axios from 'axios'

import { Button } from '../Button/Button'
import { Input } from '../Input/Input'
import s from './CreateGroup.module.css'

type FormValues = {
  name: string
}
type Props = {
  onSuccess: () => void
}

export const CreateGroup = ({
  onSuccess
}: Props) => {
  const formMethods = useForm<FormValues>()
  const [isLoading, setIsLoading] = useState(false)
  const queryClient = useQueryClient()

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)
    const response = await axios.postForm(
      '/api/groups',
      data,
      { withCredentials: true }
    )
    setIsLoading(false)
    if (response.status === 201) {
      onSuccess()
      toast.success('New group added.')
      queryClient.invalidateQueries({ queryKey: ['groups'] })
    }
  }

  return (
    <div className={s.container}>
      <form className={s.form} onSubmit={formMethods.handleSubmit(onSubmit)}>
        <Input name="name" label="Name" formMethods={formMethods} required autoFocus />
        <div className={s.saveButton}>
          <Button type="submit" disabled={isLoading}>
            Save
          </Button>
        </div>
      </form>
    </div>
  )
}
