/* eslint-disable import-helpers/order-imports */
import { Button, Form, Input } from 'antd';
import { ipcRenderer } from 'electron';

export default function SignIn() {
  function handleFinish({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    ipcRenderer.send('send', {
      method: 'login',
      email,
      password,
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
