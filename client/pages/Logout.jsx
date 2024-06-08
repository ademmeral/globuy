import { Navigate, useNavigate } from 'react-router';
import { logout } from '@handlers/user';
import { showToast } from '@utils/sync';
import { useLayoutEffect } from 'react';
import Spinner from '@components/Spinner'

function Logout() {
  const navigate = useNavigate();
  useLayoutEffect(() => {
    (async () => {
      await showToast.promise(
        logout(),
        null, 'Logged out successfully 🥲'
      );
      navigate('/')
    })()
  }, [])
  return <Spinner />;
}

export default Logout