import { Navigate } from 'react-router-dom';
import { useUser } from '@hooks/user';

function Authenticated({ children }) {
  const { data: user } = useUser('/auth');
  
  if (!user) return <Navigate to='/' replace={true} />
  else return children;
}

export default Authenticated