import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'

import { Body } from '../../components/Body/Body'
import { Card } from '../../components/Card/Card'
import { Modal } from '../../components/Modal/Modal'
import { Button } from '../../components/Button/Button'
import { CreateTestimonial } from '../../components/CreateTestimonial/CreateTestimonial'
import { Placeholder } from '../../components/Placeholder/Placeholder'
import { Testimonial } from '../../types'
import s from './Testimonials.module.css'

export const Testimonials = () => {
  const { groupId } = useParams()
  const [showModal, setShowModal] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial>()
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['testimonials', groupId],
    queryFn: async () => {
      const { data } = await axios.get(`/api/groups/${groupId}/testimonials`)
      return data
    }
  })

  const deleteTestimonial = async (id: number) => {
    const response = await axios.delete(
      `/api/groups/${groupId}/testimonials/${id}`
    )
    if (response.status === 200) {
      toast.success('Testimonial deleted.')
      queryClient.invalidateQueries({ queryKey: ['testimonials'] })
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingTestimonial(undefined)
  }

  return (
    <Body>
      <header className={s.header}>
        <h2>Testimonials</h2>
        <Button onClick={() => setShowModal(true)}>Add Testimonial</Button>
      </header>
      <div className={s.testimonials}>
        {(query.isLoading || !query.data?.data?.length) && [1, 2, 3].map((id: number) => (
          <Placeholder key={id} />
        ))}

        {query.data?.data?.length ? query.data.data.map((item: Testimonial) => (
          <Card
            key={item.id}
            data={item}
            onEdit={() => {
              setShowModal(true)
              setEditingTestimonial(item)
            }}
            onDelete={deleteTestimonial}
          />
        )) : null}
      </div>

      {!query.isLoading && !query.data?.data?.length && (
        <div className={s.add}>
          Click <button className={s.addBtn} onClick={() => setShowModal(true)}>here</button> to add testimonial
        </div>
      )}

      <Modal
        title={`${editingTestimonial?.id ? 'Edit Testimonial' : 'Add Testimonial'}`}
        isOpen={showModal}
        onClose={closeModal}
      >
        <CreateTestimonial
          onSuccess={closeModal}
          editingTestimonial={editingTestimonial}
        />
      </Modal>
    </Body>
  )
}
