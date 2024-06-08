import { NavLink } from 'react-router-dom'

function Error() {
  return (
    <section className="error-section section">
      <div className="error page error-container container flex align-center justify-center">
        <article>
          <h1>An error has occured 😒</h1>
          <NavLink to='/home'>
            <small>Go home</small>
          </NavLink>
        </article>
      </div>
    </section>
  )
}

export default Error