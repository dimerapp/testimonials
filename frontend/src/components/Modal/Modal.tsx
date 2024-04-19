import React from 'react'
import ReactModal from 'react-modal'
import { X } from 'react-feather'

import s from './Modal.module.css'

type Props = {
  isOpen: boolean
  title: string
  children: React.ReactNode
  onClose: () => void
}

export const Modal = ({
  isOpen,
  title,
  children,
  onClose,
}: Props) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={s.modal}
      overlayClassName={s.overlay}
      closeTimeoutMS={250}
    >
      <header className={s.header}>
        <h2 className={s.title}>{title}</h2>
        <button className={s.closeButton} onClick={onClose}>
          <X size={20} />
        </button>
      </header>
      {children}
    </ReactModal>
  )
}
