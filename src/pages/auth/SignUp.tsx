/* eslint-disable object-curly-newline */
import { Button, Col, Form, Input, Row } from 'antd';

export default function SignUp() {
  return (
    <Form layout="vertical">
      <Row gutter={16}>
        <Col sm={12} xs={24}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input placeholder="Name" type="text" />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            label="Surname"
            name="surname"
            rules={[{ required: true }]}
          >
            <Input placeholder="Surname" type="text" />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input addonAfter="@" placeholder="Email" type="email" />
          </Form.Item>
        </Col>

        <Col sm={12} xs={24}>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true }]}
          >
            <Input placeholder="Address" type="address" />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item label="Password" name="password">
            <Input.Password placeholder="Password" />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item label="Confirm password" name="confirmPassword">
            <Input.Password placeholder="Confirm password" />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Button type="primary">Sign Up</Button>
        </Col>
      </Row>
    </Form>
  );
}
