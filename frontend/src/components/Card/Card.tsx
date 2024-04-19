import { useState } from 'react'
import { Edit3, Trash2 } from 'react-feather'

import { Modal } from '../Modal/Modal'
import { Button } from '../Button/Button'
import { Testimonial } from '../../types'
import s from './Card.module.css'

type Props = {
  data: Testimonial
  onEdit: () => void
  onDelete: (id: number) => Promise<void>
}

export const Card = ({
  data,
  onEdit,
  onDelete,
}: Props) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  return (
    <div className={s.container}>
      <div className={s.header}>
        <img className={s.avatar} height={48} src={data.authorAvatarUrl} alt="avatar" />
        <div className={s.actions}>
          <button className={s.actionButton} onClick={onEdit}>
            <Edit3 width={15} />
          </button>
          <button
            className={s.actionButton}
            onClick={() => setShowDeleteModal(true)}
          >
            <Trash2 width={15} />
          </button>
        </div>
      </div>
      <h4 className={s.name}>{data.authorName}</h4>
      <h5 className={s.role}>{data.authorRole}</h5>
      <p className={s.content}>{data.content}</p>
      <Modal
        title="Delete Testimonial"
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      >
        <p className={s.modalText}>
          Are you sure you want to delete this testimonial by "{data.authorName}"?
        </p>
        <footer className={s.modalFooter}>
          <Button onClick={() => onDelete(data.id)}>Yes, delete</Button>
        </footer>
      </Modal>
    </div>
  )
}
