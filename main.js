const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { exec } = require('child_process');

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,

    // titleBarStyle: 'hidden',
    // titleBarOverlay: true,

    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#2f324100',
      symbolColor: '#a8abaf',
      height: 45
    },

    // dev tool ctrl shift i
    
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    }
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle('exec-command', (event, command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        const formattedError = stderr.replace(/\r?\n|\r/g, '\n');
        console.error(`Erro: ${formattedError}`);
        reject(formattedError);
      } else {
        resolve(stdout);
      }
    });
  });
});