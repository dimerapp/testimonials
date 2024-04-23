import { useState } from 'react'
import { LogOut } from 'react-feather'
import { NavLink, useNavigate } from 'react-router-dom'

import { CreateGroup } from '../CreateGroup/CreateGroup'
import { Groups } from '../Groups/Groups'
import { Modal } from '../Modal/Modal'
import s from './Header.module.css'

export const Header = () => {
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  const afterCreateGroup = (id: number) => {
    setShowModal(false)
    navigate(`/groups/${id}/testimonials`)
  }

  const storedGroupId = localStorage.getItem('group_id')

  return (
    <header className={s.header}>
      <div className={s.dropdown}>
        <svg width={24} viewBox="0 0 42 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 1a1 1 0 0 1 1-1h23c8.423 0 15 4.22 15 13.5v21C42 43.907 35.423 48 27 48H4a1 1 0 0 1-1-1V1Z" fill="#6142D2" /><path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 1a1 1 0 0 1 1-1h14c8.423 0 15 4.22 15 13.5v21c0 9.407-6.577 13.5-15 13.5h-14a1 1 0 0 1-1-1V1Z" fill="#461C7C" /><path fill-rule="evenodd" clip-rule="evenodd" d="M0 1a1 1 0 0 1 1-1h5c8.423 0 15 4.22 15 13.5v21C21 43.907 14.423 48 6 48H1a1 1 0 0 1-1-1V1Z" fill="#02E2FF" /></svg>
        <Groups onAddClick={() => setShowModal(true)} />
      </div>
      <nav className={s.nav}>
        <NavLink
          className={({ isActive }) => isActive ? `${s.link} ${s.linkActive}` : s.link}
          to={`/groups/${storedGroupId}/testimonials`}
        >
          Testimonials
        </NavLink>
        <NavLink
          className={({ isActive }) => isActive ? `${s.link} ${s.linkActive}` : s.link}
          to="/how-to-use"
        >
          How to use
        </NavLink>

        <button className={s.logoutButton} onClick={() => { navigate('/login') }}>
          <LogOut />
        </button>
      </nav>
      <Modal
        title="Add Group"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <CreateGroup onSuccess={afterCreateGroup} />
      </Modal>
    </header>
  )
}
