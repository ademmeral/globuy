import React from 'react'
import { RiVideoAddFill } from "react-icons/ri";
import { NavLink } from 'react-router-dom'
import { useUser } from '@hooks/user'

function Add({ children }) {
  const { data: user } = useUser('/auth');

  if (!user) return;
  return (
    <li className='story new pos-rel'>
      <NavLink to='/stories/new' className='btn pos-abs' role='button'>
        <RiVideoAddFill />
      </NavLink>
      {children}
    </li>
  )
}

export default Add