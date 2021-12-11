/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { remote } from 'electron';

import logo from './logo.svg';
import './App.scss';

const App: React.FC = () => {
  const handleClose = (e: any): void => {
    e.preventDefault();
    remote.getCurrentWindow().close();
  };
  return (
    <div className="App">
      <header className="App-header">
        <img alt="logo" className="App-logo" src={logo} />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="#" onClick={handleClose}
role="button">
          Click this link to close the window.
        </a>
      </header>
    </div>
  );
};

export default App;
