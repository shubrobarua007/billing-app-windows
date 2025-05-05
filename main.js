const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let backend;

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Load built frontend
  mainWindow.loadFile(path.join(__dirname, 'clientside', 'dist', 'index.html'));

  // OPTIONAL: Open DevTools
  // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  // Start backend automatically
  backend = spawn('node', ['serverside/test.js'], {
    stdio: 'inherit',
    shell: true,
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
  if (backend) backend.kill();
});
