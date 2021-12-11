import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '@/context/AuthContext';

export default function Home() {
  const { authState } = useContext(AuthContext);

  if (!authState.token) return <Navigate to="/auth" />;

  return <div>HOME</div>;
}
