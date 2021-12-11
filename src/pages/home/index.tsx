/* eslint-disable @typescript-eslint/no-use-before-define */
import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import JobItem from '@/components/JobItem';
import ResumeItem from '@/components/ResumeItem';
import { AuthContext } from '@/context/AuthContext';
import { GlobalContext } from '@/context/GlobalContext';
import { Button, Col, Input, Row, Space, Tabs } from 'antd';
import { ipcRenderer } from 'electron';

export default function Home() {
  const { authState } = useContext(AuthContext);

  if (!authState.ok) return <Navigate to="/auth" />;

  return (
    <Tabs defaultActiveKey={authState.role === 'employer' ? 'resumes' : 'jobs'}>
      <Tabs.TabPane key="jobs" tab="Jobs">
        <Jobs />
      </Tabs.TabPane>
      <Tabs.TabPane key="resumes" tab="Resumes">
        <Resumes />
      </Tabs.TabPane>
    </Tabs>
  );
}

function Resumes() {
  const { globalState } = useContext(GlobalContext);
  const [query, setQuery] = useState('');

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    ipcRenderer.send('send', { method: 'read_resumes' });
  }, []);

  const resumes = [...(globalState?.data.resumes || [])];

  return (
    <>
      <Space size={10} style={{ marginBottom: '20px' }}>
        <Input
          onChange={(evt) => setQuery(evt.target.value)}
          type="text"
          value={query}
        />
        <Button
          onClick={() => {
            if (query.length >= 3) {
              ipcRenderer.send('send', {
                method: 'read_resumes',
                query,
              });
            }
          }}
          type="primary"
        >
          Search
        </Button>
        <Button onClick={() => {
          ipcRenderer.send('send', {
            method: 'read_resumes',
          });
        }} type="dashed">
          Clear
        </Button>
      </Space>
      <Row gutter={[15, 15]}>
        {resumes?.reverse()?.map((resume: any, i: number) => (
          // eslint-disable-next-line react/no-array-index-key
          <Col key={i} md={8} sm={12}
xl={6} xs={24}>
            <ResumeItem resume={resume} />
          </Col>
        ))}
      </Row>
    </>
  );
}

function Jobs() {
  const { globalState } = useContext(GlobalContext);
  const [query, setQuery] = useState('');

  useEffect(() => {
    ipcRenderer.send('send', { method: 'read_jobs' });
  }, []);

  const jobs = [...(globalState?.data.jobs || [])];

  return (
    <>
      <Space size={10} style={{ marginBottom: '20px' }}>
        <Input
          onChange={(evt) => setQuery(evt.target.value)}
          type="text"
          value={query}
        />
        <Button
          onClick={() => {
            if (query.length >= 3) {
              ipcRenderer.send('send', {
                method: 'read_jobs',
                query,
              });
            }
          }}
          type="primary"
        >
          Search
        </Button>
        <Button onClick={() => {
          ipcRenderer.send('send', {
            method: 'read_jobs',
          });
        }} type="dashed">
          Clear
        </Button>
      </Space>
      <Row gutter={[15, 15]}>
        {jobs?.reverse()?.map((job: any, i: number) => (
          // eslint-disable-next-line react/no-array-index-key
          <Col key={i} md={8} sm={12}
xl={6} xs={24}>
            <JobItem job={job} />
          </Col>
        ))}
      </Row>
    </>
  );
}
