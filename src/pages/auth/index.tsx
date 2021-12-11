import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '@/context/AuthContext';
import { Tabs } from 'antd';

import SignIn from './SignIn';
import SignUp from './SignUp';

export default function Auth() {
  const { authState } = useContext(AuthContext);

  if (authState.token) return <Navigate to="/" />;

  return (
    <Tabs
      centered
      defaultActiveKey="1"
      style={{ maxWidth: '500px', margin: '50px auto' }}
    >
      <Tabs.TabPane key="1" tab="Sign In">
        <SignIn />
      </Tabs.TabPane>
      <Tabs.TabPane key="2" tab="Sign Up">
        <SignUp />
      </Tabs.TabPane>
    </Tabs>
  );
}
