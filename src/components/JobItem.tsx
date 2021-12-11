/* eslint-disable import-helpers/order-imports */
import { useContext, useState } from 'react';
import { Button, Card, Descriptions, Drawer, Popconfirm, Space } from 'antd';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { ipcRenderer } from 'electron';
import { AuthContext } from '@/context/AuthContext';

export default function JobItem({ job }: { job: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const { authState } = useContext(AuthContext);

  const extra = (
    <Space size={10} style={{ justifyContent: 'space-between' }}>
      <Button
        icon={<EyeOutlined />}
        onClick={() => setIsOpen(true)}
        type="primary"
      />
      {authState.role === 'employer' && (
        <Popconfirm
          cancelText="No"
          okText="Yes"
          onConfirm={() => {
            ipcRenderer.sendSync('send', {
              method: 'delete_job',
              // eslint-disable-next-line no-underscore-dangle
              id: job._id.$oid,
            });
            ipcRenderer.send('send', {
              method: 'read_jobs',
            });
          }}
          title="Are you sure to delete this job?"
        >
          <Button danger icon={<DeleteOutlined />} type="primary" />
        </Popconfirm>
      )}
    </Space>
  );

  return (
    <>
      <Card extra={extra} title={job?.title}>
        <Descriptions column={1}>
          <Descriptions.Item label="Salary">{job?.title}</Descriptions.Item>
          <Descriptions.Item label="Location">
            {job?.location}
          </Descriptions.Item>
          <Descriptions.Item label="Company">
            {job?.company_name}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Drawer
        onClose={() => setIsOpen(false)}
        title="Description"
        visible={isOpen}
        width={400}
      >
        <p>{job.description}</p>
      </Drawer>
    </>
  );
}
