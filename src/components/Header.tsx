import { useContext } from 'react';

import { AuthActions, AuthContext } from '@/context/AuthContext';
import { Button, Layout, Menu } from 'antd';

import './Header.scss';

export default function Header() {
  const { authDispatch } = useContext(AuthContext);
  return (
    <Layout.Header className="header">
      <Menu mode="horizontal" style={{ minWidth: '500px' }} theme="light">
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
      <Button
        onClick={() => authDispatch({ type: AuthActions.SING_OUT })}
        type="link"
      >
        Logout
      </Button>
    </Layout.Header>
  );
}
