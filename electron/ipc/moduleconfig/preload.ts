import { contextBridge, ipcRenderer } from 'electron';
import { moduleConfigIPCApi } from './api';

export const preload = () => {
  const api = {};

  for (const methodName in moduleConfigIPCApi) {
    const item = moduleConfigIPCApi[methodName];
    api[methodName] = () => ipcRenderer.invoke(item.eventName);
  }

  contextBridge.exposeInMainWorld('IPC', api);
};
