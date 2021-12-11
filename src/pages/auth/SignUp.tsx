/* eslint-disable object-curly-newline */
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { ipcRenderer } from 'electron';

export default function SignUp() {
  function handleFinish(values: any) {
    ipcRenderer.send("send", {
      method: "register",
      email: values.email,
      password: values.password,
      role: values.role
    });
  }

  return (
    <Form initialValues={{role: "employer"}} layout="vertical" onFinish={handleFinish}>
      <Row gutter={16}>
        <Col sm={12} xs={24}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true }]}
          >
            <Input placeholder="Email" type="email" />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password placeholder="Password" type="text" />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item label="Role" name="role" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="employer">Employer</Select.Option>
              <Select.Option value="employee">Employee</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Button htmlType="submit" type="primary">Sign Up</Button>
        </Col>
      </Row>
    </Form>
  );
}
