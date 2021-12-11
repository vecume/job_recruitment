/* eslint-disable import-helpers/order-imports */
import { Button, Card, Descriptions, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ipcRenderer } from 'electron';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export default function ResumeItem({ resume }: { resume: any }) {
  const { authState } = useContext(AuthContext);
  const extra = (
    <Popconfirm
      cancelText="No"
      okText="Yes"
      onConfirm={() => {
        ipcRenderer.sendSync('send', {
          method: 'delete_resume',
          // eslint-disable-next-line no-underscore-dangle
          id: resume._id.$oid,
        });
        ipcRenderer.send('send', {
          method: 'read_resumes',
        });
      }}
      title="Are you sure to delete this resume?"
    >
      <Button danger icon={<DeleteOutlined />} type="primary" />
    </Popconfirm>
  );

  return (
    <Card extra={authState.role === "employee" && extra} title={resume?.skills}>
      <Descriptions column={1}>
        <Descriptions.Item label="Name">{resume?.name}</Descriptions.Item>
        <Descriptions.Item label="Surname">{resume?.surname}</Descriptions.Item>
        <Descriptions.Item label="Experience">{resume?.experience}</Descriptions.Item>
        <Descriptions.Item label="Location">
          {resume?.location}
        </Descriptions.Item>
        {/* <Descriptions.Item label="Description">
          {resume?.description}
        </Descriptions.Item> */}
      </Descriptions>
    </Card>
  );
}
