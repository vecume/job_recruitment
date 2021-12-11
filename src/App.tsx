/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Auth from './pages/auth';
import Home from './pages/home';

import './App.scss';

// eslint-disable-next-line arrow-body-style
const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Auth />} path="/auth" />
      </Routes>
    </div>
  );
};

export default App;
