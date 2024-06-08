import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import RegisterVid from '@assets/videos/register_vid-480p.mp4'
import { register } from '@handlers/user'
import { showToast } from '@utils/sync'
import '@styles/Form.css';

const domains = [
  '--default','gmail.com', 'outlook.com', 'hotmail.com', 
  'yandex.ru', 'mail.ru', 'yandex.com', 'yahoo.com', 
  'aol.com'
]

function Register(){
  const [canRegister, setCanRegister] = useState(true);

  const handleSubmit = async e => {
    e.preventDefault()
    
    await showToast.promise(
      register(e.target),
      null, 'Signed up successfully 😊'
    )
  }

  return (
    <section className='section login-section form-section'>
      <div className='form-container container flex align-center justify-center'>
        <div className="login-wrapper form-wrapper flex">
          <form method='POST' className='form login-form flex-col align-start justify-center' onSubmit={handleSubmit}>
            <legend>
              <h1>Register</h1>
              <hr />
            </legend>
            <label className='flex'>
              <input name='firstname' placeholder='Firstname' required/>
              <input name='lastname' placeholder='Lastname' required/>
            </label>
            <div className='flex email-area'>
              <input name='email.name' placeholder='Email' pattern='\w{3,24}' required />
              <div className="at">
                <span>@</span>
              </div>
              <select name="email.domain">
              {
                domains.map(d => (
                  <option value={d} key={d}>{d}</option>
                ))
              }
              </select>
            </div>
            <label className='flex'>
              <input name='username' placeholder='Username' required/>
              <input type='password' name='password' placeholder='Password' required/>
            </label>
            <label className='flex'>
              <input type='number' name='phone.areaCode' placeholder='+44'/>
              <input type='tel' name='phone.number' placeholder='444-44-44'/>
            </label>
            <label htmlFor="reg-remember" className='flex justify-start align-center'>
              <input type="checkbox" id='reg-remember'/>
              <span>Let's remember you</span>
            </label>
            <button type='submit' disabled={!canRegister} className='btn btn-red submit-btn'>Register</button>
            <small className="form-footer flex">
              <span>Already have an account?</span>
              <NavLink to={'/login'}>Login</NavLink>
            </small>
          </form>
          <div className="media pos-rel">
            <div className="overlay pos-abs abs-full flex align-center justify-center" />
            <article className='flex-col pos-abs abs-x-center'>
                <h3>Do not waste your time at SCs!</h3>
                <h2>Everything exists here 😊</h2>
              </article>
            <video autoPlay loop muted>
              <source src={RegisterVid} type='video/mp4' />
              <span>Your browser is behind the era to play a simple video 😒</span>
            </video>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register