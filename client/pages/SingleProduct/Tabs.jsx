import { useParams } from "react-router"
import { NavLink } from 'react-router-dom'

function Tabs({ children, links }) {
  const { id } = useParams();
  return (
    <div className="tabs">
      <ul className="tab-list flex no-flow">
        {
          Object.entries(links).map(([k,v]) => (
            <li key={k}>
              <NavLink to={`/products/${id}/${k}`}>
                {v}
              </NavLink>
            </li>
          ))
        }
      </ul>
      {children}
    </div>
  )
}

export default Tabs