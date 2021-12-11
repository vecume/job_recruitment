/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/**
 *  This eventually will be migrated into Typescript once I find a correct way to bundle it up.
 *  You are welcome to open a branch and make it work in TS.
 *  IT IS IMPORTANT THAT IT ACCEPTS DEPENDENCIES: it is certain that under this main directory
 *  you will add files that are part of the electron main process.
 */

import { app, BrowserWindow } from 'electron';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from 'electron-devtools-installer';
import isDev from 'electron-is-dev';

console.log('starting Electron...');

let mainWindow;
const mainWindowConfig = {
  width: 1280,
  height: 720,
  minWidth: 1280,
  minHeight: 720,
  frame: true,
  transparent: false,
  webPreferences: {
    nodeIntegration: true,
    webSecurity: false,
    enableRemoteModule: true,
  },
};

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}

function onReady() {
  console.log(`${app.getVersion()}`); // eslint-disable-line
  mainWindow = new BrowserWindow(mainWindowConfig);
  const fileName = isDev
    ? 'http://localhost:3000'
    : `file://${__dirname}/index.html`;
  if(isDev) {
    mainWindow.webContents.openDevTools({
      mode: "right",
    });
  }
  mainWindow.loadURL(fileName);
  mainWindow.on('close', () => app.quit());
}

app.on('ready', () => onReady());
app.on('window-all-closed', () => app.quit());
app.commandLine.appendSwitch('ignore-certificate-errors', 'true');
app.whenReady().then(() => {
  if (isDev) {
    [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS].forEach((extension) => {
      installExtension(extension)
        .then((name) => console.log(`Added Extension: ${name}`))
        .catch((err) => console.log('An error occurred: ', err));
    });
  }
});
