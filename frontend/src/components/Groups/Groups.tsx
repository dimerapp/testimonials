import { useEffect, useState } from 'react'
import { ChevronDown, Check, PlusCircle } from 'react-feather'
import { useNavigate, useParams } from 'react-router-dom'
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
  const { groupId } = useParams()
  const [isOpen, setIsOpen] = useState(false)
  const ref = useOutsideClick(() => setIsOpen(false))

  const query = useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      const { data } = await axios.get('/api/groups')
      return data
    }
  })

  const updateLS = (_groupId: string) => {
    localStorage.setItem('group_id', _groupId)
  }

  const handleChange = (_groupId: number) => {
    navigate(`../groups/${_groupId}/testimonials`)
    updateLS(String(_groupId))
  }

  const groups: Group[] = query.data?.data ?? []
  const selectedGroupId = groupId ?? localStorage.getItem('group_id')
  const selected = groups.find(group => String(group.id) === selectedGroupId) ?? groups[0]

  useEffect(() => {
    if (!query.isLoading && !groups.length) {
      onAddClick()
    }
  }, [groups])

  useEffect(() => {
    selectedGroupId && updateLS(selectedGroupId)
  }, [groupId])

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
