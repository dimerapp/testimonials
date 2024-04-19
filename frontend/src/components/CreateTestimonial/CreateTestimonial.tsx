import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'

import { Input } from '../../components/Input/Input'
import { FileInput } from '../../components/FileInput/FileInput'
import { Button } from '../../components/Button/Button'
import { Testimonial } from '../../types'
import s from './CreateTestimonial.module.css'

type FormValues = {
  authorName: string
  authorAvatar: string
  content: string
  authorRole?: string
}

type Props = {
  onSuccess: () => void
  editingTestimonial?: Testimonial
}

export const CreateTestimonial = ({
  editingTestimonial,
  onSuccess,
}: Props) => {
  const { groupId } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const queryClient = useQueryClient()
  const formMethods = useForm<FormValues>({
    defaultValues: editingTestimonial ? {
      authorName: editingTestimonial.authorName,
      authorRole: editingTestimonial.authorRole,
      content: editingTestimonial.content
    } : {}
  })

  const onSubmit = async (formValues: FormValues) => {
    setIsLoading(true)
    const requestMethod = !!editingTestimonial
      ? axios.putForm
      : axios.postForm

    const response = await requestMethod(
      `/api/groups/${groupId}/testimonials`,
      { ...formValues, authorAvatar: formValues.authorAvatar[0] },
      { withCredentials: true }
    )
    setIsLoading(false)
    if (response.status === 201) {
      onSuccess()
      const successMsg = !!editingTestimonial
        ? 'Testimonial updated.'
        : 'New testimonial added.'
      toast.success(successMsg)
      queryClient.invalidateQueries({ queryKey: ['testimonials'] })
    }
  }

  return (
    <div className={s.container}>
      <form className={s.form} onSubmit={formMethods.handleSubmit(onSubmit)}>
        <Input name="authorName" label="Name" formMethods={formMethods} required autoFocus />
        <Input name="authorRole" label="Role" formMethods={formMethods} />
        <div className={s.fileInput}>
          <FileInput
            name="authorAvatar"
            label="Avatar"
            formMethods={formMethods}
            required={!editingTestimonial?.authorAvatarUrl}
          />
          {editingTestimonial?.authorAvatarUrl &&
            <img className={s.existingAvatar} src={editingTestimonial?.authorAvatarUrl} />
          }
        </div>
        <Input name="content" label="Testimonial" formMethods={formMethods} required multiline />

        <div className={s.saveButton}>
          <Button type="submit" disabled={isLoading}>
            Save Testimonial
          </Button>
        </div>
      </form>
    </div>
  )
}
