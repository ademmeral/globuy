import React from 'react'
import { Navigate } from 'react-router-dom';
import { useUser } from '@hooks/user';

function Private({ children }) {
  const { data: user } = useUser('/auth');

  if (!user?.isAdmin) return <Navigate to='/' replace={true} />
  else return children;
}

export default Private