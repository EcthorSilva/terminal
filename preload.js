const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    execCommand: (command) => ipcRenderer.invoke('exec-command', command)
});