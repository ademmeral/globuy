import { NavLink } from "react-router-dom"

function LinkItem({ children, path, text }) {
  return (
    <li className="flex align-center justify-start">
      <NavLink to={`/${path}`} className={`link flex align-center`}>
        <div className="pos-rel flex">{children}</div>
        {<span className="fade link-text">{text || path}</span>}
      </NavLink>
    </li>
  )
}

export default LinkItem