/* eslint-disable import-helpers/order-imports */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext, useEffect, useLayoutEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { message } from 'antd';
import { ipcRenderer } from 'electron';

import Header from './components/Header';
import { AuthActions, AuthContext } from './context/AuthContext';
import Auth from './pages/auth';
import Home from './pages/home';

import './App.scss';
import { GlobalContext } from './context/GlobalContext';

// eslint-disable-next-line arrow-body-style
const App: React.FC = () => {
  const { authState, authDispatch } = useContext(AuthContext);
  const { globalDispatch } = useContext(GlobalContext);

  useEffect(() => {
    ipcRenderer.on('data', (_, data) => {
      console.log(data);
      if (!data?.ok) {
        message.error(
          data?.err_str || 'Something went wrong! Please try again!'
        );
      } else {
        switch (data.method) {
          case 'login':
            message.success('Successful');
            authDispatch({
              type: AuthActions.SIGN_IN,
              payload: {
                ok: !!data?.result,
                role: data?.result,
              },
            });
            break;
          case 'is_logged_in':
            message.success('Successful');
            if (data.result) {
              authDispatch({
                type: AuthActions.SIGN_IN,
                payload: {
                  ok: !!data?.result,
                  role: data?.result,
                },
              });
            }
            break;
          case 'read_jobs':
            globalDispatch({
              payload: {
                jobs: data.result,
              },
            });
            break;
          case 'read_resumes':
            globalDispatch({
              payload: {
                resumes: data.result,
              // eslint-disable-next-line linebreak-style
              },
            });
            break;
          default:
            break;
        }
      }
    });

    ipcRenderer.on('closed', () => {
      ipcRenderer.send('reconnect');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    ipcRenderer.send('send', { method: 'is_logged_in' });
  }, []);

  return (
    <div className="app">
      {authState.ok && <Header />}
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Auth />} path="/auth" />
      </Routes>
    </div>
  );
};

export default App;
