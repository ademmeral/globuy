import React from 'react'
import { NavLink } from 'react-router-dom'

function Dropdown({ links, className, children, ...props }) {
  return (
    <menu className={className} {...props}>
      {
        links.map(l => (
          <li key={l}>
            <NavLink to={`/${l}`}>{l}</NavLink>
          </li>
        ))
      }
      {children}
    </menu>
  )
}

export default Dropdown