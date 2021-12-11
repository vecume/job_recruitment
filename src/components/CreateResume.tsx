/* eslint-disable object-curly-newline */
import { Button, Col, Form, Input, Row } from 'antd';
import { ipcRenderer } from 'electron';

export default function CreateResume({closeModal}:{closeModal: any}) {
  function handleFinish(values: any) {
    ipcRenderer.sendSync("send", {
      method: "create_resume",
      name: values.name,
      surname: values.surname,
      skills: values.skills,
      experience: values.experience,
      location: values.location,
    });

    ipcRenderer.send("send", {
      method: "read_resumes"
    });

    closeModal();
  }

  return (
    <Form layout="vertical" onFinish={handleFinish}>
      <Row gutter={16}>
        <Col sm={12} xs={24}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true }]}
          >
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
          <Form.Item
            label="Experience"
            name="experience"
            rules={[{ required: true }]}
          >
            <Input placeholder="Experience" type="text" />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            label="Skills"
            name="skills"
            rules={[{ required: true }]}
          >
            <Input placeholder="Skills" type="text" />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true }]}
          >
            <Input placeholder="Location" type="text" />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Button htmlType="submit" type="primary">Create Resume</Button>
        </Col>
      </Row>
    </Form>
  );
}
