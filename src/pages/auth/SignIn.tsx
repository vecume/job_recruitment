/* eslint-disable import-helpers/order-imports */
import { AuthActions, AuthContext } from '@/context/AuthContext';
import { Button, Form, Input } from 'antd';
import { useContext } from 'react';

export default function SignIn() {
  const { authDispatch } = useContext(AuthContext);

  function handleFinish({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    authDispatch({
      type: AuthActions.SIGN_IN,
      payload: {
        user: {},
        token: `${email}${password}`,
      },
    });
  }

  return (
    // eslint-disable-next-line react/jsx-no-bind
    // eslint-disable-next-line react/jsx-sort-props
    <Form onFinish={handleFinish} layout="vertical">
      <Form.Item label="Email" name="email" rules={[{ required: true }]}>
        <Input autoComplete="email" placeholder="Email" type="email" />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[{ required: true }]}>
        <Input.Password
          autoComplete="currentPassword"
          placeholder="Password"
          type="password"
        />
      </Form.Item>
      <Button htmlType="submit" type="primary">
        Sign In
      </Button>
    </Form>
  );
}
