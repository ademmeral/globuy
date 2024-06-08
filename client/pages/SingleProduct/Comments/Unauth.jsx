import { NavLink } from "react-router-dom"

function Unauth({ user }) {
  if (user) return;
  return (
    <div className="unauth flex-col">
      <p>You must login to interact 😒</p>
      <div className="unauth-links flex">
        <NavLink to='/login'>Login</NavLink>
        <span>/</span>
        <NavLink to='/register'>Register</NavLink>
      </div>
    </div>
  )
}

export default Unauth