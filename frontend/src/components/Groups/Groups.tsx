import { useState } from 'react'
import { ChevronDown, Check, PlusCircle } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { useOutsideClick } from '../../utils/useOutsideClick'
import { Group } from '../../types'
import s from './Groups.module.css'

type Props = {
  onAddClick: () => void
}

export const Groups = ({
  onAddClick,
}: Props) => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const query = useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      const { data } = await axios.get('/api/groups')
      return data
    }
  })

  const groups: Group[] = query.data?.data ?? []

  const handleChange = (_groupId: number) => {
    navigate(`../groups/${_groupId}/testimonials`)
    localStorage.setItem('group_id', String(_groupId))
  }

  const ref = useOutsideClick(() => setIsOpen(false))

  const lsGroupId = localStorage.getItem('group_id')
  const selected = groups.find(group => String(group.id) === lsGroupId) ?? groups[0]

  return (
    <div className={`${s.container} ${isOpen ? s.isOpen : ''}`} ref={ref}>
      <button className={s.trigger} onClick={() => setIsOpen(!isOpen)}>
        <span>{selected ? selected.name : 'Select a group'}</span>
        <ChevronDown size={16} className={s.downIcon} />
      </button>

      <div className={s.items}>

        {groups.map((group: Group) => (
          <div
            key={group.id}
            className={`${s.item} ${group.name === selected.name ? s.isSelected : ''}`}
            onClick={() => {
              handleChange(group.id)
              setIsOpen(false)
            }}
          >
            <span>{group.name}</span>
            {group.name === selected.name && (
              <Check className={s.checkIcon} size={15} />
            )}
          </div>
        ))}

        <div className={s.separator} />

        <button onClick={() => {
          setIsOpen(false)
          onAddClick()
        }} className={s.button}>
          <PlusCircle size={14} />
          New Group
        </button>

      </div>
    </div>
  )
}
