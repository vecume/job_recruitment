/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import { useContext, useState } from 'react';

import { AuthActions, AuthContext } from '@/context/AuthContext';
import { Button, Layout, Modal, Popconfirm, Space } from 'antd';

import './Header.scss';
import CreateJob from './CreateJob';
import CreateResume from './CreateResume';

export default function Header() {
  const { authState, authDispatch } = useContext(AuthContext);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <Layout.Header className="header">
      JOBS
      <Space size={8}>
        {authState.role === 'employer' ? (
          <Button onClick={() => setIsJobModalOpen(true)}>Create JOB</Button>
        ) : authState.role === 'employee' ? (
          <Button onClick={() => setIsResumeModalOpen(true)}>Create RESUME</Button>
        ) : (
          ''
        )}
        {authState.role?.toUpperCase()}
        <Popconfirm
          cancelText="No"
          okText="Yes"
          onConfirm={() => authDispatch({ type: AuthActions.SING_OUT })}
          title="Are you sure to log out?"
        >
          <Button type="link">Logout</Button>
        </Popconfirm>
        ,
      </Space>
      <Modal footer={null} onCancel={() => setIsJobModalOpen(false)} visible={isJobModalOpen}>
        <CreateJob closeModal={() => setIsJobModalOpen(false)}/>
      </Modal>
      <Modal footer={null} onCancel={() => setIsResumeModalOpen(false)} visible={isResumeModalOpen}>
        <CreateResume closeModal={() => setIsResumeModalOpen(false)}/>
      </Modal>
    </Layout.Header>
  );
}
