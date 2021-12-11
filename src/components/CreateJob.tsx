/* eslint-disable object-curly-newline */
import { Button, Col, Form, Input, InputNumber, Row } from 'antd';
import { ipcRenderer } from 'electron';

export default function CreateJob({closeModal}:{closeModal: any}) {
  function handleFinish(values: any) {
    ipcRenderer.sendSync("send", {
      method: "create_job",
      title: values.title,
      description: values.description,
      salary: parseInt(values.salary, 10),
      location: values.location,
      company_name: values.companyName
    });

    ipcRenderer.send("send", {
      method: "read_jobs"
    });

    closeModal();
  }

  return (
    <Form layout="vertical" onFinish={handleFinish}>
      <Row gutter={16}>
        <Col sm={12} xs={24}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true }]}
          >
            <Input placeholder="Title" type="text" />
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
        <Col sm={12} xs={24}>
          <Form.Item
            label="Company name"
            name="companyName"
            rules={[{ required: true }]}
          >
            <Input placeholder="Company name" type="text" />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            label="Salary"
            name="salary"
            rules={[{ required: true }]}
          >
            <InputNumber placeholder="Salary" style={{width: "100%"}}/>
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true }]}
          >
            <Input.TextArea placeholder="Description" rows={3} style={{resize: "vertical"}} />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Button htmlType="submit" type="primary">Create Job</Button>
        </Col>
      </Row>
    </Form>
  );
}
