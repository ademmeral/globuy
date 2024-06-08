import { NavLink } from 'react-router-dom'

function NotFound() {
  return (
    <section className="_404-section section">
      <div className="_404 page _404-container container flex align-center justify-center">
        <article>
          <h1>404, Page not found 😒</h1>
          <NavLink to='/home'>
            <small>Go home</small>
          </NavLink>
        </article>
      </div>
    </section>
  )
}

export default NotFound