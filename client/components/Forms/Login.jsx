import React from 'react'
import { NavLink } from 'react-router-dom'
import LoginVid from '@assets/videos/login_vid-480p.mp4'
import { login } from '@handlers/user'
import { showToast } from '@utils/sync'
import '@styles/Form.css';

function Login() {

  const handleSubmit = async e => {
    e.preventDefault();
    showToast.promise(
      login(e.target),
      null, 'Logged in successfully 😊'
    )
  }

  return (
    <section className='section login-section form-section'>
      <div className='form-container container flex align-center justify-center'>
        <div className="login-wrapper form-wrapper flex">
          <form className='form login-form flex-col align-start justify-center' onSubmit={handleSubmit}>
            <legend>
              <h1>Login</h1>
              <hr />
            </legend>
            <label className='flex-col'>
            <input name='user' placeholder='Username or Email' required/>
            <input type="password" name='password' placeholder='Your password' required/>
            </label>
            <label htmlFor="log-remember" className='flex justify-start align-center'>
              <input type="checkbox" id='log-remember'/>
              <span>Let's remember you</span>
            </label>
            <button type='submit' className='btn btn-red submit-btn'>Login</button>
            <small className="form-footer flex">
              <span>Haven't gotten an account yet?</span>
              <NavLink to={'/register'}>Register</NavLink>
            </small>
          </form>
          <div className="media pos-rel">
            <div className="overlay pos-abs abs-full flex align-center justify-center" />
            <article className='flex-col pos-abs abs-x-center'>
                <h3>Do not waste your time at SCs!</h3>
                <h2>Everything exists here 😊</h2>
              </article>
            <video autoPlay loop muted>
              <source src={LoginVid} type='video/mp4' />
              <span>Your browser is behind the era to play a simple video 😒</span>
            </video>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login