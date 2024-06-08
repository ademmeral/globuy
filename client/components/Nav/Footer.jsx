import Dropdown from "../Dropdown";
import { useClickOut } from '@hooks/hooks'
import { NavLink } from 'react-router-dom';
import FormLinks from "./FormLinks";
import { useUser } from "@hooks/user";
import Thumb from '@components/Thumb'
import Spinner from '@components/Spinner'
import { MdError } from 'react-icons/md'
import classNames from 'classnames';

const style = {
  spinner : { width: 'var(--size-icon)', height: 'var(--size-icon)', borderWidth: '2px' },
  error: { width: 'var(--size-icon)', height: 'var(--size-icon)' }
}

const links = ['orders', 'profile', 'logout'];

function NavFooter() {
  const [ref, out] = useClickOut()
  const { data: user, error, isLoading } = useUser('/auth');

  if (isLoading) return <footer><Spinner style={style.spinner} /></footer>;
  if (error) return <footer><MdError style={style.error} className="self-center"/></footer>;

  return (
    <footer 
      className={classNames("footer pos-rel", { open: !out })} 
      role='button'
    >
      {
        user ? (
          <button  type="button" className="nav-thumb btn" ref={ref}>
            <Thumb photo={user.photo} className="flex align-center" account='user'>
              <h5>{user.username}</h5>
              <small className='muted'>{user.isAdmin ? 'Admin' : 'User'}</small>
            </Thumb>
          </button>
        ) : <FormLinks />
      }
      <Dropdown links={links} className={'dropdown pos-abs'}>
        {
          user?.isAdmin
            ? <NavLink to={'/dashboard'}>Dashboard</NavLink>
            : null
        }
      </Dropdown>
    </footer>
  )
}

export default NavFooter